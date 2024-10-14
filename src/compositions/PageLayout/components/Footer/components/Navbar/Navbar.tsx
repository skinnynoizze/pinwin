import React from 'react'
import { Message } from '@locmod/intl'
import { Icon } from '@iconify/react'
import { constants } from 'helpers'

import messages from './messages'

// Array for text links
const textItems = [
  {
    text: messages.nav.docs,
    link: constants.links.docs,
  },
  {
    text: messages.nav.terms,
    link: constants.links.terms,
  },
  {
    text: messages.nav.policy,
    link: constants.links.policy,
  },
  {
    text: messages.nav.faq,
    link: constants.links.faq,
  },
]

// Array for social icons
const socialItems = [
  {
    link: 'https://x.com/pinwinxyz', // Replace with your actual profile link
    icon: 'line-md:twitter-x', // Using Material Design Icons for Twitter
  },
  {
    link: 'https://discord.com/invite/your_invite_code', // Replace with your actual Discord invite link
    icon: 'line-md:discord', // Discord icon
  },
]

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2"> {/* Changed to flex-col for vertical layout */}
      {/* Render social icons above text links */}
      <div className="flex items-center space-x-2">
        {
          socialItems.map((item, index) => (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              rel="noreferrer"
              target="_blank"
            >
              <Icon icon={item.icon} className="text-grey-60 hover:text-grey-90" />
            </a>
          ))
        }
      </div>
      {/* Render text links below social icons */}
      <div className="flex items-center space-x-3">
        {
          textItems.map((item, index) => (
            <a
              key={`${item.link}-${index}`}
              className="flex items-center"
              href={item.link}
              rel="noreferrer"
              target="_blank"
            >
              <Message value={item.text} className="font-medium text-grey-60 hover:text-grey-90 hover:underline" />
            </a>
          ))
        }
      </div>
    </div>
  )
}

export default Navbar
