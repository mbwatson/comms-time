const assert = require('assert')
const { categories, groups, projects } = require('../src/data')

/* Projects */

describe('Projects', () => {
  it('should be non-empty', () => {
    assert.notEqual(projects.length, 0)
  })

  it('should should have unique IDs', () => {
    const ids = new Set(projects.map(p => p.id))
    assert.equal(projects.length, ids.size)
  })
})

/* Groups */

describe('Groups', () => {
  it('should be non-empty', () => {
    assert.notEqual(groups.length, 0)
  })

  it('should should have unique IDs', () => {
    const ids = new Set(groups.map(g => g.id))
    assert.equal(groups.length, ids.size)
  })
})

/* Categories */

describe('Categories', () => {
  it('should be non-empty', () => {
    assert.notEqual(categories.length, 0)
  })

  it('should should have unique IDs', () => {
    const ids = new Set(categories.map(c => c.id))
    assert.equal(categories.length, ids.size)
  })
})
