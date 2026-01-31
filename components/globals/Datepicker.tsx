'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dispatch, SetStateAction } from 'react'

export function DatePickerDemo({
  date,
  setDate,
  className
}: {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
  className?: string
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="focus-visible:ring-0 data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal bg-white hover:!bg-gray-200"
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-auto p-0 ${className ? className : ''}`}>
        <Calendar mode="single" selected={date} onSelect={setDate} className='bg-white hover:!bg-white'/>
      </PopoverContent>
    </Popover>
  )
}
