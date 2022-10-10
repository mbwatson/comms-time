import PropTypes from 'prop-types'
import { useTimer } from '../../../context'

export const ProjectCell = ({ projectId }) => {
  const { projects } = useTimer()
  const project = projects.find(c => c.id === projectId)

  if (!project) {
    return 'UNKNOWN'
  }

  return project.name
}

ProjectCell.propTypes = {
  projectId: PropTypes.string.isRequired,
}
