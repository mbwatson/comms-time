import PropTypes from 'prop-types'
import { useTimer } from '../../../context'

export const CategoryCell = ({ categoryId }) => {
  const category = useTimer().categories.find(c => c.id === categoryId)

  return category.name
}

CategoryCell.propTypes = {
  categoryId: PropTypes.string.isRequired,
}
