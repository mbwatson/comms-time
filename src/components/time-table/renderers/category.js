import PropTypes from 'prop-types'
import { useTimer } from '../../../context'

export const CategoryCell = ({ categoryId }) => {
  const { categories } = useTimer()
  const category = categories.find(c => c.id === categoryId)

  if (!category) {
    return 'UNKNOWN'
  }

  return category.name
}

CategoryCell.propTypes = {
  categoryId: PropTypes.string.isRequired,
}
