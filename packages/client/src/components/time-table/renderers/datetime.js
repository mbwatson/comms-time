import PropTypes from 'prop-types'

export const DateTimeCell = ({ datetime }) => {
  if (!datetime) {
    return '- - -'
  }

  const date = new Date(datetime)

  return `${ date.toLocaleDateString() }, ${ date.toLocaleTimeString() }`
}

DateTimeCell.propTypes = {
  datetime: PropTypes.object.isRequired,
}
