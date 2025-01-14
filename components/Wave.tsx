interface Props {
  /** Variation of border style (1-4). Default value of 1. */
  type?: number
  /** Background color (e.g. 'bg-primary'). */
  bgColor: string
  /** Fill color of wave SVG. Name of custom CSS property (e.g. 'priamry'). */
  fillColor: string
}

/** Wavy border used to separate sections. */
export const Wave = ({ type, bgColor, fillColor }: Props) => (
  <div className={'w-full ' + bgColor}>
      {
        type === 1 &&
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 120 1440 200'
          preserveAspectRatio='none'
          className='w-full -mb-px'
        >
          <path 
            fill={'var(--' + fillColor + ')'} 
            fillOpacity='1' 
            d='M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z' 
          />
        </svg>
      }
      {
        type === 2 &&
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 20 1440 300'
          preserveAspectRatio='none'
          className='w-full -mb-px'
        >
          <path 
            fill={'var(--' + fillColor + ')'} 
            fillOpacity='1' 
            d='M0,32L48,58.7C96,85,192,139,288,149.3C384,160,480,128,576,122.7C672,117,768,139,864,170.7C960,203,1056,245,1152,245.3C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z' 
          />
        </svg>
      }
      {
        type === 3 &&
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 60 1440 260'
          preserveAspectRatio='none'
          className='w-full -mb-px'
        >
          <path 
            fill={'var(--' + fillColor + ')'} 
            fillOpacity='1' 
            d='M0,192L48,181.3C96,171,192,149,288,128C384,107,480,85,576,101.3C672,117,768,171,864,202.7C960,235,1056,245,1152,218.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          />
        </svg>
      }
      {
        type === 4 &&
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 180 1440 140'
          preserveAspectRatio='none'
          className='w-full -mb-px'
        >
          <path 
            fill={'var(--' + fillColor + ')'} 
            fillOpacity='1' 
            d='M0,224L60,240C120,256,240,288,360,272C480,256,600,192,720,186.7C840,181,960,235,1080,261.3C1200,288,1320,288,1380,288L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
          />
        </svg>
      }
  </div>
)

Wave.defaultProps = {
  type: 1,
}