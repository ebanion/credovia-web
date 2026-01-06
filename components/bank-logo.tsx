"use client"

import Image from "next/image"
import { useState } from "react"

interface BankLogoProps {
  name: string
  file: string
}

export function BankLogo({ name, file }: BankLogoProps) {
  const [error, setError] = useState(false)

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 w-full h-20 flex items-center justify-center relative hover:shadow-md transition-all duration-300 group">
      {!error ? (
        <div className="relative w-full h-full opacity-60 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
          <Image
            src={`/banks/${file}`}
            alt={name}
            fill
            className="object-contain p-2"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <span className="text-slate-400 font-bold text-sm text-center select-none">{name}</span>
      )}
    </div>
  )
}
