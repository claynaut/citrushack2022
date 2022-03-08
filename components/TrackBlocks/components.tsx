import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  image: string,
  title: string,
}

const tracksAnim = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
  hidden: { opacity: 0 },
}

const trackAnim = {
  visible: {
    y: [-15, 0, -15],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
}

export function Block({ image, title }: Props) {
  return (
    <div className='relative flex flex-col items-center'>
      <motion.div variants={trackAnim} className='transform-gpu'>
        <Image
          src={image}
          width={380}
          height={380} 
          quality={50}
          priority={Boolean(true)}
          objectFit='contain' 
        />
      </motion.div>
      <h4 className='absolute bottom-8 md:bottom-4 font-normal'>{title}</h4>
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
];

export function TrackBlocks() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={tracksAnim}
      className='flex flex-wrap justify-center gap-y-6'
    >
      {tracks.map(({ image, imageDark, title }) => (
        <Block
          key={image}
          image={theme === 'light' ? image : imageDark}
          title={title}
        />
      ))}
    </motion.div>
  )
}
