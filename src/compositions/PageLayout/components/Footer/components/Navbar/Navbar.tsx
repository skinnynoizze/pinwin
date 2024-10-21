import React from 'react'
import { Message } from '@locmod/intl'
import { Icon } from '@iconify/react'
import { constants } from 'helpers'

import messages from './messages'

// Array for text links
const textItems = [
  {
    text: messages.nav.docs,
    link: 'https://pinwin-xyz.gitbook.io/pinwin.xyz-docs',
    icon: 'simple-icons:gitbook',
  },
]

// Array for social icons
const socialItems = [
  {
    link: 'https://x.com/pinwinxyz', // Replace with your actual profile link
    icon: 'proicons:x-twitter', // Using Material Design Icons for Twitter
  },
  {
    link: 'https://discord.com/invite/your_invite_code', // Replace with your actual Discord invite link
    icon: 'akar-icons:discord-fill', // Discord icon
  },
]

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Render social icons and text links in a single line */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {
            socialItems.map((item, index) => (
              <a
                key={`${item.link}-${index}`}
                href={item.link}
                rel="noreferrer"
                target="_blank"
              >
                <Icon icon={item.icon} className="text-grey-60 hover:text-grey-90 text-xl" />
              </a>
            ))
          }
        </div>
        <div className="flex items-center space-x-3">
          {
            textItems.map((item, index) => (
              <a
                key={`${item.link}-${index}`}
                className="flex items-center space-x-1"
                href={item.link}
                rel="noreferrer"
                target="_blank"
              >
                <Icon icon={item.icon} className="text-grey-60 text-lg" />
                <Message value={item.text} className="font-medium text-grey-60 hover:text-grey-90 hover:underline" />
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
