import PropTypes from 'prop-types'
import { Stack, Typography } from '@mui/material'

export const DateTimeCell = ({ datetime }) => {
  if (!datetime) {
    return '- - -'
  }

  const date = new Date(datetime)

  return (
    <Stack>
      <Typography variant="string" color="text.primary">{ date.toLocaleTimeString() }</Typography>
      <Typography variant="caption" color="text.secondary">{ date.toLocaleDateString() }</Typography>
    </Stack>
  )
}

DateTimeCell.propTypes = {
  datetime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
}
