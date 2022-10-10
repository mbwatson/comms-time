import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
const TimerContext = createContext({ })
import { generateRecord, useLocalStorage } from './util'
import { categories, projects } from './data'

export const useTimer = () => useContext(TimerContext)

export const TimerProvider = ({ children }) => {
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

  const startTimer = () => {
    setTiming(true)
  }

  const stopTimer = () => {
    const newRecord = {
      id: uuidv4(),
      project: record.project,
      category: record.category,
      title: record.title,
      startTime: record.startTime,
      endTime: new Date(),
    }
    setRecords([newRecord, ...records])
    setTiming(false)
    setRuntime(0)
  }

  const deleteRecord = id => {
    const recordIndex = records.findIndex(r => r.id === id)
    if (-1 < recordIndex && recordIndex < records.length) {
      setRecords([...records.slice(0, recordIndex), ...records.slice(recordIndex + 1)])
    }
    setRecords([...records.filter(r => r.id !== id)])
  }

  const addFakeRecord = () => {
    if (!categories.length || !projects.length) {
      return
    }
    const fakeRecord = generateRecord({ categories, projects })
    setRecords([fakeRecord, ...records])
  }

  const duplicateAndStartNewRecord = id => {
    const recordIndex = records.findIndex(r => r.id === id)
    if (recordIndex < 0 || records.length <= recordIndex) {
      return
    }
    const newRecord = {
      ...records[recordIndex],
      id: uuidv4(),
      startTime: new Date(),
    }
    if (timing) {
      stopTimer()
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
      return
    }
    newRecords[recordIndex] = { ...newRecord }
    setRecords([...newRecords])
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
      records, deleteRecord, record, setRecord, handleChangeRecord, duplicateAndStartNewRecord, addFakeRecord, updateRecord,
      timing, startTimer, stopTimer, runtime,
      config, setConfig,
    }}>
      { children }
    </TimerContext.Provider>
  )
}

TimerProvider.propTypes = {
  children: PropTypes.node,
}
