import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { FiberManualRecord as DotIcon } from '@mui/icons-material'
import { useTimer } from '../../../context'

export const ProjectCell = ({ projectId }) => {
  const { projects } = useTimer()
  const project = projects.find(c => c.id === projectId)

  if (!project) {
    return 'UNKNOWN'
  }

  const color = project.color

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, 'svg': { transform: 'scale(0.75)' } }}>
      <DotIcon sx={{ color }} fontSize="small" /> { project.name }
    </Box>
  )
}

ProjectCell.propTypes = {
  projectId: PropTypes.string.isRequired,
}
