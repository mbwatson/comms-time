import PropTypes from 'prop-types'
import { useTimer } from '../../../context'
import { msToHHMMSS } from '../../../util'

export const DurationCell = ({ startTime, endTime }) => {
  return msToHHMMSS(new Date(endTime) - new Date(startTime)).toString()
}

DurationCell.propTypes = {
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
}
