import PropTypes from 'prop-types'
import { useTimer } from '../../../context'

export const ProjectCell = ({ projectId }) => {
  const project = useTimer().projects.find(c => c.id === projectId)

  return project.name
}

ProjectCell.propTypes = {
  projectId: PropTypes.string.isRequired,
}
