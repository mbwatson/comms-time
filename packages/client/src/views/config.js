import { Fragment } from 'react'
import { Card, CardContent, CardHeader, Divider } from '@mui/material'
import { useTimer } from '../context'

export const ConfigView = () => {
  const { categories, projects } = useTimer()

  return (
    <Fragment>
      <Card
        variant="outlined"
        sx={{ backgroundColor: '#66778811' }}
      >
        <CardHeader title="Projects" />
        <Divider />
        <CardContent>
          <pre>
            { JSON.stringify(projects, null, 2) }
          </pre>
        </CardContent>
      </Card>

      <Card
        variant="outlined"
        sx={{ backgroundColor: '#66778811' }}
      >
        <CardHeader title="Categories" />
        <Divider />
        <CardContent>
          <pre>
            { JSON.stringify(categories, null, 2) }
          </pre>
        </CardContent>
      </Card>

    </Fragment>
  )
}
