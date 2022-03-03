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
      + ( type === 'kumquat' ? 'w-52 '
        : (
        type === 'cutie' ? 'w-52 '
        : (
        type === 'tangerine' ? 'w-52 '
        : (
        type === 'orange' ? 'w-64 '
        : (
        type === 'pomelo' ? 'w-72 '
        : ''
      )))))
      + (shrink ? 'w-36' : '')
    }
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.995 }}
      className={
        'w-full'
      }
    >
      <a target='_blank' rel='noreferrer noopener' href={link}>
        <Image
          src={image}
          width={width}
          height={height}
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
    sponsors: []
  },
  {
    type: 'orange',
    sponsors: []
  },
  {
    type: 'tangerine',
    sponsors: [
      {
        image: '/assets/sponsors/gcap.svg',
        width: 727,
        height: 728,
        link: 'https://www.gcapucr.com/aboutgcap',
        shrink: null,
      },
    ]
  },
  {
    type: 'cutie',
    sponsors: [
      {
        image: '/assets/sponsors/wolfram.svg',
        width: 198,
        height: 154.34,
        link: 'https://www.wolframalpha.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/fedex.svg',
        width: 2308,
        height: 1054,
        link: 'https://www.fedex.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/sketch.svg',
        width: 1919,
        height: 463,
        link: 'https://sketch.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/triad.svg',
        width: 371,
        height: 95,
        link: 'https://www.triadmagnetics.com/',
        shrink: null,
      },
      {
        image: '/assets/sponsors/acm-ucr.svg',
        width: 910,
        height: 910,
        link: 'https://acmucr.org/',
        shrink: Boolean(true),
      },
      {
        image: '/assets/sponsors/ieee.svg',
        width: 745,
        height: 959,
        link: 'https://ieee.ee.ucr.edu/',
        shrink: Boolean(true),
      },
    ]
  },
  {
    type: 'kumquat',
    sponsors: []
  },
]

export const SponsorsGrid = () => (
  <div className='flex flex-col gap-6'>
    { tiers
      .filter(({ sponsors }) => sponsors.length > 0) // only map tiers with sponsors
      .map(({ type, sponsors }) =>
      <div
        key={type}
        className='relative flex flex-wrap justify-center w-full gap-6 gap-y-12 sm:gap-y-6 p-10 rounded-md shadow-lg'
      >
        <h4 className='absolute top-0 left-[1.75rem] font-semibold uppercase rotate-90 origin-left'>
          {type}
        </h4>
        { sponsors.map(({ image, width, height, link, shrink }) =>
          <Sponsor
            key={link}
            type={type}
            image={image}
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