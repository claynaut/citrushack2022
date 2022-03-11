import React, { useState } from 'react'
import { BiX } from 'react-icons/bi'
import ExternalLink from '@/components/ExternalLink'

interface Props {
  question: string,
  answer: string | React.ReactNode
}

export function FaqAccordion({ question, answer }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <div className='flex flex-col w-full border-b-2 border-sub'>
      <div 
        className='flex py-3 items-center hover:text-highlight cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        <h4 className='grow font-semibold'>{question}</h4>
        <div>
          <BiX 
            className={
              'text-4xl transform-gpu transition-transform duration-150 '
              + (open ? 'rotate-0' : 'rotate-45')
            }
          />
        </div>
      </div>
      <div 
        className={
          'transition-size overflow-hidden duration-250 h-full '
          + (open ? 'max-h-[20rem]' : 'max-h-0')
        }
      >
        <p className='m-0 mb-8'>{answer}</p>
      </div>
    </div>
  )
}

const faq = [
  {
    question: 'What is a hackathon?',
    answer: 'A hackathon is an event where teams or inviduals rush to make a creative project. Throughout, there will be free workshops intended to guide you in creating your project. At the end of the time slot, contestants have the opportunity to demo their projects to judges and win prizes.'
  },
  {
    question: 'How do I apply?',
    answer: 'You need to sign in first with either your email or Google account. The application form is then accessible on the website after signing in.'
  },
  {
    question: 'When are applications due?',
    answer: 'Applications are due by midnight on Friday, April 1, 2022. Be sure to submit your application before then in order to participate.'
  },
  {
    question: 'Is Citrus Hack free?',
    answer: 'Applying and attending Citrus Hack is completely free! You’ll get access to mentors, workshops, and prizes at no extra cost.'
  },
  {
    question: 'How long is Citrus Hack?',
    answer: 'Citrus Hack will be a 24-hour event.'
  },
  {
    question: 'Who can come to Citrus Hack?',
    answer: 'We welcome anyone from any high school or undergrad college to come out and hack with us.'
  },
  {
    question: 'Where is the event?',
    answer: <>Since this event will be hybrid, we will have two locations for the event. <u>Note that only UCR students can attend in person.</u> For those attending in-person, the event will be located in Winston Chung Hall at UCR. And for those attending online, the event will be hosted on Discord so be sure to make an account before you apply. An invite link to our server will be sent via email to those who will be participating and will be also made available on the website for those qualified.</>
  },
  {
    question: 'What if I\'ve never been to a hackathon before?',
    answer: 'That\'s the best reason to come out! Citrus Hack is open to people of all skill-levels. We\'ll have workshops and activities, along with mentors to help get you started and turn your project into reality.'
  },
  {
    question: 'What will I need to participate?',
    answer: 
    <>
      If you&apos;re participating in-person, <u>you&apos;ll need to wear a mask, bring proof of vaccination,  
      and fill out</u> <ExternalLink name='this daily wellness check-in form' link='http://visitorwellnesscheck.ucr.edu/'/>  <u>per UCR&apos;s guidelines.</u>{' '}
      Otherwise, if you&apos;re staying online, all you need is a working device
      (i.e your laptop or PC) and a stable internet connection. If you haven&apos;t already, create a Discord and/or Zoom to help you participate.
    
    </>
  },
  {
    question: 'Where will we submit?',
    answer: 'You will submit through Devpost. Further instructions will follow on the day-of the event.'
  },
  {
    question: 'Can I submit a project I\’ve already worked on?',
    answer: 'No, you must start working on project code after hacking starts at 9am PST. Projects started before that time or have been submitted to other hackathons will be disqualified. Make sure your submission is unique to Citrus Hack!'
  },
  {
    question: 'What if I don\'t have a team?',
    answer: 'If you don\'t have a team formed prior to Citrus Hack, we will have a channel on Discord where you can find other participants that share similar interests. We\'ll also be providing activities at the beginning of the event to help you form teams. Teams aren\'t required though, so feel free to work individually.'
  },
  {
    question: 'Do I have to hack or make a project?',
    answer: 'Not at all! You can attend a workshop just to learn, network with fellow hackers, and participate in games and raffles. You\'ll be able to find the schedule on our website as we get closer to the event.'
  },
  {
    question: 'If I\'m residing outside of the U.S., can I still attend and/or win a prize?',
    answer: 'Those outside of the U.S. can still attend, compete, and win. However, due to shipping restrictions and COVID, we won\’t be able to send any physical items to those residing outside of the U.S.'
  },
  {
    question: 'My question isn\'t listed?',
    answer: 
      <>
        Feel free to email us at <ExternalLink name='citrushack@gmail.com' link='mailto:citrushack@gmail.com'/> if you have any more questions.
      </>
  },
]

export const FaqGrid = () => (
  <>
    { faq.map(({ question, answer }) => (
      <FaqAccordion
        key={question}
        question={question}
        answer={answer}
      />
    ))}
  </>
)