import PropTypes from 'prop-types'
import { useTimer } from '../../../context'
import { msToHHMMSS } from '../../../util'

export const DurationCell = ({ row }) => {
  return msToHHMMSS(row.endTime.valueOf() - row.startTime.valueOf()).toString()
}

DurationCell.propTypes = {
  row: PropTypes.object.isRequired,
}
