import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

interface Props {
  image: string,
  title: string,
  idx: number,
  animate: boolean
}

export function Block ({ image, title, idx, animate }: Props) {
  const controls = useAnimation()

  useEffect(() => {
    if (animate) {
      controls.start(i => ({
        y: [0, -20, 0],
        transition: {
          duration: 4.375,
        },
      }))
    }
  }, [animate])

  return (
    <div className='relative flex flex-col items-center'>
      <motion.div
        custom={idx}
        animate={controls}
        className='transform-gpu'
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
}

const tracks = [
  {
    image: '/assets/tracks/diversity-light.svg',
    imageDark: '/assets/tracks/diversity-dark.svg',
    title: 'Diversity & Inclusion',
  },
  {
    image: '/assets/tracks/sustainability-light.svg',
    imageDark: '/assets/tracks/sustainability-dark.svg',
    title: 'Sustainability',
  },
  {
    image: '/assets/tracks/health-light.svg',
    imageDark: '/assets/tracks/health-dark.svg',
    title: 'Health & Wellness',
  },
]

export function TrackBlocks() {
  const [blockIdx, setBlockIdx] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setBlockIdx(blockIdx == tracks.length - 1 ? 0 : blockIdx + 1)
    }, 4375)
  
    return () => clearTimeout(timer)
  }, [blockIdx, setBlockIdx])

  if (!mounted) return null

  return (
    <div className='flex flex-wrap justify-center gap-y-6'>
      { tracks.map(({ image, imageDark, title }, idx) => 
          <Block
            key={image}
            image={theme === 'light' ? image : imageDark}
            title={title}
            idx={idx}
            animate={Boolean(blockIdx === idx)}
          />
        )
      }
    </div>
  )

}