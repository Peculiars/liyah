'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import type { PropsWithChildren } from 'react'

export default function MotionDiv(
  props: PropsWithChildren<HTMLMotionProps<'div'>>
) {
  return <motion.div {...props} />
}
