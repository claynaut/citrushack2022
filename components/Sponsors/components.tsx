import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface SponsorProps {
  type: string,
  image: string,
  width: number,
  height: number,
  link: string,
  shrink?: boolean,
}

export const Sponsor = ({ type, image, width, height, link, shrink }: SponsorProps) => (
  <div
    className={
      'flex items-center '
      + ( type === 'kumquat' ? 'w-32 md:w-36 '
        : (
        type === 'cutie' ? 'w-32 md:w-36 '
        : (
        type === 'tangerine' ? 'w-32 md:w-36 '
        : (
        type === 'orange' ? 'w-40 md:w-48 '
        : (
        type === 'pomelo' ? 'w-40 md:w-48 '
        : ''
      )))))
      + (shrink ? 'w-16 md:w-24' : '')
    }
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.995 }}
      className='w-full transform-gpu'
    >
      <a target='_blank' rel='noreferrer noopener' href={link}>
        <Image
          src={image}
          width={width}
          height={height}
          quality={50}
          priority={Boolean(true)}
          layout='responsive'
          objectFit='contain'
        />
      </a>
    </motion.div>
  </div>
)

const tiers = [
  {
    type: 'pomelo',
    wide: null,
    sponsors: [
      {
        image: '/assets/sponsors/twilio-light.svg',
        imageDark: '/assets/sponsors/twilio-dark.svg',
        width: 60,
        height: 60,
        link: 'https://www.twilio.com/',
        shrink: null,
      }
    ]
  },
  {
    type: 'orange',
    wide: null,
    sponsors: []
  },
  {
    type: 'tangerine',
    wide: null,
    sponsors: [
      {
        image: '/assets/sponsors/gcap-light.svg',
        imageDark: '/assets/sponsors/gcap-dark.svg',
        width: 727,
        height: 728,
        link: 'https://www.gcapucr.com/aboutgcap',
        shrink: null,
      },
    ]
  },
  {
    type: 'cutie',
    wide: Boolean(true),
    sponsors: [
      {
        image: '/assets/sponsors/wolfram-light.svg',
        imageDark: '/assets/sponsors/wolfram-dark.svg',
        width: 198,
        height: 154.34,
        link: 'https://www.wolframalpha.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/fedex-light.svg',
        imageDark: '/assets/sponsors/fedex-dark.svg',
        width: 2308,
        height: 1054,
        link: 'https://www.fedex.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/sketch-light.svg',
        imageDark: '/assets/sponsors/sketch-dark.svg',
        width: 1919,
        height: 463,
        link: 'https://sketch.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/triad-light.svg',
        imageDark: '/assets/sponsors/triad-dark.svg',
        width: 371,
        height: 95,
        link: 'https://www.triadmagnetics.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/vercel-light.svg',
        imageDark: '/assets/sponsors/vercel-dark.svg',
        width: 4437.5,
        height: 1000,
        link: 'https://vercel.com/?utm_source=citrushack&utm_campaign=oss',
        shrink: null,
      },
      {
        image: '/assets/sponsors/snapchat.svg',
        imageDark: '/assets/sponsors/snapchat.svg',
        width: 391.39,
        height: 385.49,
        link: 'https://www.snapchat.com/',
        shrink: Boolean(true),
      },
      {
        image: '/assets/sponsors/acm-light.svg',
        imageDark: '/assets/sponsors/acm-dark.svg',
        width: 910,
        height: 910,
        link: 'https://acmucr.org/',
        shrink: Boolean(true),
      },
      {
        image: '/assets/sponsors/ieee-light.svg',
        imageDark: '/assets/sponsors/ieee-dark.svg',
        width: 745,
        height: 959,
        link: 'https://ieee.ee.ucr.edu/',
        shrink: Boolean(true),
      },
    ]
  },
  {
    type: 'kumquat',
    wide: null,
    sponsors: []
  },
]

export function SponsorsGrid() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className='grid grid-cols-2 flex flex-col gap-6'>
      { tiers
        .filter(({ sponsors }) => sponsors.length > 0) // only map tiers with sponsors
        .map(({ type, sponsors, wide }) =>
        <div
          key={type}
          className={
            'relative flex flex-wrap justify-center w-full gap-6 gap-y-12 sm:gap-y-6 p-10 rounded-md overflow-hidden '
            + (wide ? 'col-span-2' : 'col-span-2 sm:col-span-1')
          }
        >
          <h3 className='absolute top-0 left-4 flex w-full items-center transform font-black uppercase rotate-90 origin-left'>
            {type}&nbsp;<span className='w-full border-text border-t-4'></span>
          </h3>
          { sponsors.map(({ image, imageDark, width, height, link, shrink }) =>
            <Sponsor
              key={link}
              type={type}
              image={theme === 'light' ? image : imageDark}
              width={width}
              height={height}
              link={link}
              shrink={shrink}
            />
          )}
        </div>
      )}
    </div>
  )
}