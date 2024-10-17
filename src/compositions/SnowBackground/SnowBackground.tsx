import React from 'react'


export default function IcebergBackground({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-[#111] overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(166, 209, 237, 0.1)"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1e3a8a] to-transparent opacity-20" />
      </div>
      {children}
    </>
  )
}
