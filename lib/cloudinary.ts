import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

export async function uploadToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string
    resource_type?: 'image' | 'video' | 'auto'
    public_id?: string
  } = {}
): Promise<{ url: string; publicId: string; thumbnailUrl: string }> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || 'stylique',
      resource_type: options.resource_type || 'auto',
      ...(options.public_id && { public_id: options.public_id }),
      transformation:
        options.resource_type === 'video'
          ? [{ quality: 'auto', fetch_format: 'auto' }]
          : [{ quality: 'auto', fetch_format: 'auto' }],
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions as any,
      (error, result) => {
        if (error) return reject(error)
        if (!result) return reject(new Error('No result from Cloudinary'))

        const isVideo = result.resource_type === 'video'

        // For videos, generate a thumbnail from the first frame
        const thumbnailUrl = isVideo
          ? cloudinary.url(result.public_id, {
              resource_type: 'video',
              transformation: [
                { width: 600, height: 800, crop: 'fill', gravity: 'auto' },
                { format: 'jpg', quality: 'auto' },
                { start_offset: '0' },
              ],
            })
          : cloudinary.url(result.public_id, {
              transformation: [
                { width: 600, height: 800, crop: 'fill', gravity: 'auto' },
                { quality: 'auto', fetch_format: 'auto' },
              ],
            })

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          thumbnailUrl,
        })
      }
    )

    uploadStream.end(buffer)
  })
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  })
}