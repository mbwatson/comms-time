import { v4 as uuidv4 } from 'uuid'
import { loremIpsum } from 'lorem-ipsum'

function randomNumberBetween(from, to) {
  return new Date(from + Math.random() * (to - from))
}

export const generateRecord = ({ categories, projects }) => {
  const thirtyMinutesAgoUTC = Date.now() - 1000 * 60 * 30
  const twentyMinutesAgoUTC = Date.now() - 1000 * 60 * 20
  const tenMinutesAgoUTC = Date.now() - 1000 * 60 * 10

  const newRecord = {
    id: uuidv4(),
    project: projects[Math.floor(Math.random() * projects.length)].id,
    category: categories[Math.floor(Math.random() * categories.length)].id,
    title: loremIpsum(),
    startTime: randomNumberBetween(thirtyMinutesAgoUTC, twentyMinutesAgoUTC).toLocaleString(),
    endTime: randomNumberBetween(twentyMinutesAgoUTC, tenMinutesAgoUTC).toLocaleString(),
  }

  return newRecord
}
