'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import FilterInput from './FilterInput'
import { DAYS_OF_WEEK, MONTH_NAMES as monthNames } from '@/lib/dates'

// Weeks start on Monday in the dropdown.
const daysOfWeek = [...DAYS_OF_WEEK.slice(1), DAYS_OF_WEEK[0]]

const FilterBar = () => {
  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const date = searchParams.get('date')
  const dow = searchParams.get('dow')
  const month = searchParams.get('month') ? Number(searchParams.get('month')) : null

  const handleFilterInputChange = (selection: string, keyToUpdate: 'date' | 'dow' | 'month') => {
    const sp = new URLSearchParams(searchParams)
    const keys: ('date' | 'dow' | 'month')[] = ['date', 'dow', 'month']
    for (const key of keys) {
      if (key !== keyToUpdate) sp.delete(key)
    }
    if (selection) {
      sp.set(keyToUpdate, selection)
    } else sp.delete(keyToUpdate)

    replace(`${pathname}?${sp.toString()}`)
  }

  return (
    <div
      className="
      flex flex-col flex-wrap justify-evenly items-center gap-y-5 pt-2
      md:flex-row md:self-center md:gap-x-20 md:items-baseline
      "
    >
      <FilterInput inputType={'date'} handleChange={handleFilterInputChange} val={date ?? ''} />
      <FilterInput
        inputType={'select'}
        handleChange={handleFilterInputChange}
        options={daysOfWeek}
        val={dow ?? ''}
        label="Day of the week"
      />
      <FilterInput
        inputType={'select'}
        handleChange={handleFilterInputChange}
        options={monthNames}
        val={month?.toString() ?? ''}
        label="Month"
      />
    </div>
  )
}

export default FilterBar
