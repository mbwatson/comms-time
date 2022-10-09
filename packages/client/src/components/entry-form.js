import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Card, Button, ButtonGroup, Divider, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField, useTheme,
} from '@mui/material'
import {
  PlayArrow as StartTimerIcon,
  Stop as StopTimerIcon,
  Pause as PauseTimerIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'
// import TimeAgo from 'react-timeago'

export const EntryForm = ({ categories, projects }) => {
  const theme = useTheme()
  const [record, setRecord] = useState({
    project: '',
    category: '',
    title: '',
  })
  const { startTimer, stopTimer, timing } = useTimer()

  const handleChangeRecord = field => event => setRecord({
    ...record,
    [field]: event.target.value,
  })

  const clearInputs = useCallback(() => {
    setRecord({ project: '', category: '', title: '', })
  }, [])

  const handleClickStartTimer = () => {
    setRecord({ ...record, startTime: new Date() })
    startTimer()
  }

  const handleClickPauseTimer = () => {
    stopTimer({ ...record })
  }

  const handleClickStopTimer = () => {
    stopTimer({ ...record })
    clearInputs()
  }

  return (
    <Card
      variant="outlined"
      component={ Stack }
      direction={{ sm: 'column', md: 'row' }}
      alignItems="stretch"
      gap={ 2 }
      sx={{
        p: 2,
        backgroundColor: '#66778811',
        border: `1px solid ${ (record.project && record.category)
          ? '#556'
          : theme.palette.grey[300] }`,
        position: 'relative',
        transition: 'border-color 250ms',
        animation: timing ? 'border-pulse 500ms infinite linear alternate' : 'none',
      }}
    >
      <Stack direction="row" gap={ 2 } sx={{ flex: 1 }}>
        <FormControl sx={{ flex: 1 }} size="small">
          <InputLabel id="project-select-label">Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={ record.project }
            label="Project"
            onChange={ handleChangeRecord('project') }
          >
            {
              projects.map(({ id, name }) => (
                <MenuItem
                  key={ `project-${ id }` }
                  value={ id }
                >{ name }</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }} size="small">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={ record.category }
            label="Category"
            onChange={ handleChangeRecord('category') }
          >
            {
              categories.map(({ id, name }) => (
                <MenuItem
                  key={ `category-${ id }` }
                  value={ id }
                >{ name }</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Stack>
      
      <Stack direction="row" gap={ 2 } sx={{ flex: 2 }}>
        <TextField
          sx={{ flex: 1 }}
          fullWidth
          variant="outlined"
          size="small"
          value={ record.title }
          label="Title"
          onChange={ handleChangeRecord('title') }
        />

        <Divider orientation="vertical" flexItem />
        
        <ButtonGroup
          variant="contained"
          aria-label="pause or stop"
          sx={{ width: '100px' }}
        >
          {
            timing ? (
              <Button
                onClick={ handleClickPauseTimer }
                color="primary"
                sx={{ filter: 'brightness(1.1)' }}
              ><PauseTimerIcon /></Button>
            ) : (
              <Button
                color="primary"
                onClick={ handleClickStartTimer }
                disabled={ !record.project || !record.category }
              ><StartTimerIcon /></Button>
            )
          }
          <Button
            onClick={ handleClickStopTimer }
            disabled={ !timing }
            color="error"
          ><StopTimerIcon /></Button>
        </ButtonGroup>
      </Stack>
    </Card>
  )
}

EntryForm.propTypes = {
  categories: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}
/*      <Stack sx={{ float: 'right' }}>
        {
          timing && (
            <TimeAgo 
              date={ record.startTime }
              formatter={
                (value, unit) => `${ value } ${ unit }${ value !== 1 ? 's' : '' }`
              }
            />
          )
        }
      </Stack>
*/