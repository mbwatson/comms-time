import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const TimerContext = createContext({ })

export const useTimer = () => useContext(TimerContext)

const dummyTimeRecords = [
  {
    id: uuidv4(),
    project: 'heal',
    category: 'web-dev',
    title: 'work on feature x',
    startTime: new Date(1664264983869),
    endTime: new Date(1665266983869),
  },
  {
    id: uuidv4(),
    project: 'nb',
    category: 'web-dev',
    title: 'work on bugfix y',
    startTime: new Date(1664264083869),
    endTime: new Date(1665296983869),
  },
]

export const TimerProvider = ({ children }) => {
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])
  const [records, setRecords] = useState([])
  const [timing, setTiming] = useState(false)
  const [config, setConfig] = useState({
    hiddenProjects: new Set(),
    hiddenCategories: new Set(),
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
    setRecords([...dummyTimeRecords])
  }, [])

  const startTimer = () => {
    setTiming(true)
  }

  const stopTimer = ({ project, category, title, startTime }) => {
    const newRecord = {
      id: uuidv4(),
      project,
      category,
      title,
      startTime,
      endTime: new Date(),
    }
    setRecords([newRecord, ...records])
    setTiming(false)
  }

  const deleteRecord = id => {
    const recordIndex = records.findIndex(r => r.id === id)
    if (-1 < recordIndex && recordIndex < records.length) {
      setRecords([...records.slice(0, recordIndex), ...records.slice(recordIndex + 1)])
    }
    setRecords([...records.filter(r => r.id !== id)])
  }

  return (
    <TimerContext.Provider value={{
      categories, projects,
      records, deleteRecord,
      timing, startTimer, stopTimer,
      config, setConfig,
    }}>
      { children }
    </TimerContext.Provider>
  )
}

TimerProvider.propTypes = {
  children: PropTypes.node,
}
