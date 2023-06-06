import React from 'react'
import { CardProps } from '../../utils/enum'

export const Card = ({ title, date, subtitle, content, width, height}: CardProps) => (
  <div className='bg-light-blue rounded-xl px-6 py-4 min-w-card max-h-card w-full mb-4'>
    <h3 className='text-2xl text-left font-bold'>{title}</h3>
    <p className='text-xs text-left italic'>{subtitle}</p>
    <p className='text-xs text-left font-semibold'>{date}</p>
    { content && <p className="pt-6 pb-2 text-xs text-left">{content}</p> }
  </div>
)