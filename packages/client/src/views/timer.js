import { Fragment } from 'react'
import { useTimer } from '../context'
import { EntryForm } from '../components/entry-form'
import { TimeTable } from '../components/time-table'

export const TimerView = () => {
  const { categories, projects } = useTimer()

  return (
    <Fragment>
      <EntryForm
        categories={ [...categories] }
        projects={ [...projects] }
      />
      <TimeTable />
    </Fragment>
  )
}
