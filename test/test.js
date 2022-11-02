const assert = require('assert')
const { categories, groups, projects } = require('../src/data')
  
describe('Projects', () => {
  it('should be non-empty', () => projects.length > 0)
})

describe('Groups', () => {
  it('should be non-empty', () => groups.length > 0)
})

describe('Categories', () => {
  it('should be non-empty', () => categories.length > 0)
})
