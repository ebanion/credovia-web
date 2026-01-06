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
    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 w-full h-24 flex items-center justify-center relative hover:shadow-md transition-all duration-300 group">
      {!error ? (
        <div className="relative w-full h-full">
          <Image
            src={`/banks/${file}`}
            alt={name}
            fill
            className="object-contain p-1"
            onError={() => setError(true)}
          />
        </div>
      ) : (
        <span className="text-slate-400 font-bold text-sm text-center select-none">{name}</span>
      )}
    </div>
  )
}
