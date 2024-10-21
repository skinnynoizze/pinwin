import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import cx from 'classnames'
import { useLocale } from '../../contexts/LocaleContext/LocaleContext'


interface LocaleSwitcherMobileProps {
  size?: number
  className?: string
}

const LocaleSwitcherMobile: React.FC<LocaleSwitcherMobileProps> = ({
  size = 24,
  className = '',
}) => {
  const { locale, changeLocale } = useLocale() // We're getting changeLocale from the context
  const [ isOpen, setIsOpen ] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLocaleChange = (newLocale: string) => {
    console.log(`LocaleSwitcher clicked: changing locale to ${newLocale}`)
    changeLocale(newLocale)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={
          cx(
            'flex items-center justify-center',
            className
          )
        }
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch language"
      >
        <Icon icon="mdi:web" width={size} height={size} />
      </button>
      {
        isOpen && (
          <div
            className={
              cx(
                'absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20',
                'border border-gray-200'
              )
            }
          >
            <button
              className={
                cx(
                  'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full',
                  { 'bg-gray-100': locale === 'en' }
                )
              }
              onClick={() => handleLocaleChange('en')}
            >
              <Icon icon="emojione:flag-for-united-states" className="mr-2" />
              <span>English</span>
            </button>
            <button
              className={
                cx(
                  'flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full',
                  { 'bg-gray-100': locale === 'es' }
                )
              }
              onClick={() => handleLocaleChange('es')}
            >
              <Icon icon="emojione:flag-for-spain" className="mr-2" />
              <span>Español</span>
            </button>
          </div>
        )
      }
    </div>
  )
}

export default LocaleSwitcherMobile
