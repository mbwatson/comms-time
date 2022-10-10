import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
const TimerContext = createContext({ })
import { generateRecord, useLocalStorage } from './util'
import { categories, projects } from './data'
import { useToasts } from 'react-toast-notifications'

export const useTimer = () => useContext(TimerContext)

export const TimerProvider = ({ children }) => {
  const { addToast } = useToasts()
  const [records, setRecords] = useLocalStorage('comms-time', [])
  const [timing, setTiming] = useState(false)
  const [runtime, setRuntime] = useState(0)
  const [config, setConfig] = useState({
    hiddenProjects: new Set(),
    hiddenCategories: new Set(),
  })
  const [record, setRecord] = useState({
    project: '',
    category: '',
    title: '',
  })

  const notify = (appearance = 'info', message) => {
    addToast(message, {
      autoDismiss: true,
      appearance,
    })
  }

  const startTimer = () => {
    setTiming(true)
    notify('info', 'timer started')
  }

  const addRecord = newRecord =>{
    try {
      setRecords([newRecord, ...records])
      notify('success', 'record added')
    } catch (error) {
      notify('error', 'could not add record')
      console.error(error.message)
    }
  }

  const stopTimerAndAddCurrentRecord = () => {
    const newRecord = {
      id: uuidv4(),
      project: record.project,
      category: record.category,
      title: record.title,
      startTime: record.startTime,
      endTime: new Date(),
    }
    setTiming(false)
    setRuntime(0)
    notify('info', 'timer stopped')
    addRecord(newRecord)
  }

  const deleteRecord = id => {
    const recordIndex = records.findIndex(r => r.id === id)
    if (recordIndex < 0 || records.length <= recordIndex) {
      notify('error', 'could not delete record')
      return
    }
    setRecords([...records.slice(0, recordIndex), ...records.slice(recordIndex + 1)])
    notify('success', 'record deleted')
  }

  const addFakeRecord = () => {
    if (!categories.length || !projects.length) {
      notify('error', 'could not add fake record')
      return
    }
    const fakeRecord = generateRecord({ categories, projects })
    addRecord(fakeRecord)
  }

  const duplicateAndStartNewRecord = id => {
    const recordIndex = records.findIndex(r => r.id === id)
    if (recordIndex < 0 || records.length <= recordIndex) {
      notify('error', 'could not duplicate record')
      return
    }
    const newRecord = {
      ...records[recordIndex],
      id: uuidv4(),
      startTime: new Date(),
    }
    if (timing) {
      stopTimerAndAddCurrentRecord()
    }
    setRecord({ ...newRecord })
    startTimer()
  }

  const handleChangeRecord = field => event => setRecord({
    ...record,
    [field]: event.target.value,
  })

  const updateRecord = (id, newRecord) => {
    const newRecords = [...records]
    const recordIndex = newRecords.findIndex(r => r.id === id)
    if (recordIndex < 0 || newRecords.length <= recordIndex) {
      notify('error', 'could not update record')
      return
    }
    newRecords[recordIndex] = { ...newRecord }
    setRecords([...newRecords])
    notify('success', 'record updated successfully')
  }

  useEffect(() => {
    let poller
    if (!timing) {
      return () => clearTimeout(poller)
    }
    poller = setInterval(() => setRuntime(Date.now() - record.startTime), 1000)
    return () => clearInterval(poller)
  }, [record, timing])

  return (
    <TimerContext.Provider value={{
      categories, projects,
      record, setRecord, handleChangeRecord,
      records, deleteRecord, duplicateAndStartNewRecord, updateRecord, addFakeRecord,
      timing, startTimer, stopTimerAndAddCurrentRecord, runtime,
      config, setConfig,
    }}>
      { children }
    </TimerContext.Provider>
  )
}

TimerProvider.propTypes = {
  children: PropTypes.node,
}
