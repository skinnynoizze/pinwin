import React from 'react'
import cx from 'classnames'
import { useLocale } from '../../contexts/LocaleContext/LocaleContext'
// Import the useLocale hook

type LocaleSwitcherProps = {
  changeLocale?: (locale: string) => void; // Optional prop type
};

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = () => {
  const { locale, changeLocale } = useLocale() // Get locale and changeLocale from context

  const handleLocaleChange = (locale: string) => {
    console.log(`LocaleSwitcher clicked: changing locale to ${locale}`) // Log the locale change
    changeLocale(locale)
  }

  return (
    <select
      value={locale} // Set the value to the locale from context
      className={
        cx(
          'uppercase font-bold transition-all border rounded-sm',
          'text-caption-12 h-8 px-1 cursor-pointer select-none',
          'border-white/20 bg-brand-50 text-black-90',
          'hover:text-black hover:bg-white hover:border-white'
        )
      }
      onChange={(e) => handleLocaleChange(e.target.value)}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      {/* Add more options for other locales as needed */}
    </select>
  )
}

export default LocaleSwitcher
