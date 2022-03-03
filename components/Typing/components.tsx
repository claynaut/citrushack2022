import React, { useState, useEffect } from 'react'

interface Props {
  base?: string,
  phrases: string[],
  delay: number,
  cursor?: boolean // decide whether to display cursor
}

export function Typing({ base, phrases, delay, cursor }: Props) {
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [idx, setIdx] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [pauseLength, setPauseLength] = useState(delay)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (pauseLength <= 0 && reverse) {
        setIdx(idx - 1)
        if (idx === 0) {
          setReverse(false)
          setPhraseIdx(phraseIdx == phrases.length - 1 ? 0 : phraseIdx + 1)
          setPauseLength(delay)
        }
      }
      else if (reverse) {
        setPauseLength(pauseLength - 1)
      }
      else {
        setReverse(idx === phrases[phraseIdx].length)
        setIdx(idx + 1)
      }
    }, 80)
  
    return () => clearTimeout(timer)
  }, [idx, setIdx, phraseIdx, setPhraseIdx, pauseLength, setPauseLength])

  return (
    <span className='break-words'>
      { base && base }&nbsp;
      { (idx >= 0) && phrases[phraseIdx].slice(0, idx) }
      { cursor &&
        <span 
          className={
            (pauseLength !== delay && pauseLength !== 0) ?
            'animate-[blink_1s_ease-in-out_infinite] transform-gpu' : ''
          }
        >
          |
        </span>
      }
    </span>
  )
}