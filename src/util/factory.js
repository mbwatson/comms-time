import { v4 as uuidv4 } from 'uuid'
import { loremIpsum } from 'lorem-ipsum'

function randomDate(from, to) {
  return new Date(from + Math.random() * (to - from))
}

export const generateRecord = ({ categories, projects }) => {
  const newRecord = {
    id: uuidv4(),
    project: projects[Math.floor(Math.random() * projects.length)].id,
    category: categories[Math.floor(Math.random() * categories.length)].id,
    title: loremIpsum(),
    startTime: randomDate(Date.now() - 1000 * 60 * 30, Date.now() - 1000 * 60 * 20).toLocaleString(),
    endTime: randomDate(Date.now() - 1000 * 60 * 20, Date.now() - 1000 * 60 * 10).toLocaleString(),
  }
  return newRecord
}
