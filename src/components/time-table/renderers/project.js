import PropTypes from 'prop-types'
import { Box, Tooltip } from '@mui/material'
import { FiberManualRecord as DotIcon } from '@mui/icons-material'
import { useTimer } from '../../../context'

export const ProjectCell = ({ projectId }) => {
  const { projects } = useTimer()
  const project = projects.find(c => c.id === projectId)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, 'svg': { transform: 'scale(0.75)' } }}>
      <Tooltip placement="top" title={ project.group.shortName }>
        <DotIcon sx={{ color: project.group.color }} fontSize="small" />
      </Tooltip>
      { project.name }
    </Box>
  )
}

ProjectCell.propTypes = {
  projectId: PropTypes.string.isRequired,
}
