import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText } from '@mui/material'
import { useTimer } from '../context'

const Statistic = ({ label, value }) => {
  return (
    <ListItem sx={{
      '.MuiListItem-root': {},
      '.MuiListItemText-root': {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      },
      '.MuiListItemText-primary': {},
      '.MuiListItemText-primary::after': { content: '":"' },
      '.MuiListItemText-secondary': {},
    }}>
      <ListItemText
        primary={ label }
        secondary={ value }
      />
    </ListItem>
  )
}

Statistic.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}

//

export const ReportsView = () => {
  const { records } = useTimer()

  const stats = [
    { 'label': 'Number of records', value: records.length }
  ]

  return (
    <Card>
      <CardHeader title="Reports" />

      <Divider />

      <CardContent>
        <List>
          {
            stats.map((stat, i) => (
              <Statistic key={ `report-stat-${ i }` } { ...stat } />
            ))
          }
        </List>
      </CardContent>
    </Card>
  )
}
