import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
const TimerContext = createContext({ })
import { generateRecord, useLocalStorage } from './util'

export const useTimer = () => useContext(TimerContext)

export const TimerProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get('http://localhost:3030/categories'),
          axios.get('http://localhost:3030/projects'),
        ])
        const [categoriesResponse, projectsResponse] = responses
        if (!categoriesResponse || !projectsResponse) {
          throw new Error('no responses')
        }
        setProjects([...projectsResponse.data])
        setCategories([...categoriesResponse.data])
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
    setRecords([])
  }, [])

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
      records, deleteRecord, record, setRecord, handleChangeRecord, duplicateAndStartNewRecord, addFakeRecord,
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
