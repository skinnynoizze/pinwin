import React, { createContext, useContext, useState } from 'react'


type LocaleContextType = {
  locale: string;
  changeLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ locale, setLocale ] = useState('en') // Default locale

  const changeLocale = (newLocale: string) => {
    console.log(`Changing locale from ${locale} to ${newLocale}`) // Log the change
    setLocale(newLocale)
  }

  console.log(`Current locale: ${locale}`) // Log the current locale

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }

  return context
}
