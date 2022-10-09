import { v4 as uuidv4 } from 'uuid'
import { loremIpsum } from 'lorem-ipsum'

function randomDate(from, to) {
  return new Date(from + Math.random() * (to - from))
}

export const generateRecord = ({ categories, projects }) => {
  console.log(projects[Math.floor(Math.random() * projects.length)].id)
  console.log(categories[Math.floor(Math.random() * categories.length)].id)
  return {
    id: uuidv4(),
    project: projects[Math.floor(Math.random() * projects.length)].id,
    category: categories[Math.floor(Math.random() * categories.length)].id,
    title: loremIpsum(),
    startTime: randomDate(Date.now() - 1000 * 60 * 60 * 30, Date.now() - 1000 * 60 * 60 * 20),
    endTime: randomDate(Date.now() - 1000 * 60 * 60 * 20, Date.now() - 1000 * 60 * 60 * 10),
  }
}
