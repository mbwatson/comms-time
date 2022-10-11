import PropTypes from 'prop-types'
import { msToHHMMSS } from '../../../util'

export const DurationCell = ({ startTime, endTime }) => {
  return msToHHMMSS(new Date(endTime) - new Date(startTime)).toString()
}

DurationCell.propTypes = {
  startTime: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  endTime: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
}
