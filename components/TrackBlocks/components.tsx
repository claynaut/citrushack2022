import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  image: string,
  title: string,
  animation: number[]
}

export const Block = ({ image, title, animation }: Props) => (
  <div className='relative flex flex-col items-center'>
    <motion.div
      animate={{ y: animation }}
      transition={{
        repeat: Infinity,
        duration: 10,
        delay: 0.1
      }}
    >
      <Image
        src={image}
        width={320}
        height={320}
        objectFit='contain'
      />
    </motion.div>
    <h4 className='absolute bottom-8 md:bottom-4 font-normal'>
      {title}
    </h4>
  </div>
)

const tracks = [
  {
    image: '/assets/tracks/diversity-light.svg',
    imageDark: '/assets/tracks/diversity-dark.svg',
    title: 'Diversity & Inclusion',
    animation: [0, -20, 0, 0],
  },
  {
    image: '/assets/tracks/sustainability-light.svg',
    imageDark: '/assets/tracks/sustainability-dark.svg',
    title: 'Sustainability',
    animation: [0, 0, -20, 0, 0],
  },
  {
    image: '/assets/tracks/health-light.svg',
    imageDark: '/assets/tracks/health-dark.svg',
    title: 'Health & Wellness',
    animation: [0, 0, 0, -20, 0],
  },
]

export function TrackBlocks() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className='flex flex-wrap justify-center gap-y-6'>
      { tracks.map(({ image, imageDark, title, animation }) => 
          <Block
            key={image}
            image={theme === 'light' ? image : imageDark}
            title={title}
            animation={animation}
          />
        )
      }
    </div>
  )

}