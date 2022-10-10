import { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Card, Button, ButtonGroup, Divider, FormControl, InputLabel,
  MenuItem, Select, Stack, TextField, useTheme,
} from '@mui/material'
import {
  PlayArrow as StartTimerIcon,
  Stop as StopTimerAndAddCurrentRecordIcon,
  Pause as PauseTimerIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'

export const EntryForm = ({ categories, projects }) => {
  const theme = useTheme()
  const { startTimer, stopTimerAndAddCurrentRecord, timing, record, setRecord, handleChangeRecord } = useTimer()

  const clearInputs = useCallback(() => {
    setRecord({ project: '', category: '', title: '', })
  }, [])

  const handleClickStartTimer = () => {
    setRecord({ ...record, startTime: new Date() })
    startTimer()
  }

  const handleClickPauseTimer = () => {
    stopTimerAndAddCurrentRecord()
  }

  const handleClickStopTimerAndAddCurrentRecord = () => {
    stopTimerAndAddCurrentRecord()
    clearInputs()
  }

  const handleKeyDowninTitleInput = event => {
    if (event.keyCode === 13) {
      if (timing) {
        stopTimerAndAddCurrentRecord()
      } else {
        setRecord({ ...record, startTime: new Date() })
        startTimer()
      }
    }
  }

  return (
    <Box>
      <Card
        square
        variant="outlined"
        component={ Stack }
        direction={{ sm: 'column', md: 'row' }}
        alignItems="stretch"
        gap={ 2 }
        sx={{
          p: 2,
          backgroundColor: `${ theme.palette.background.paper }`,
          border: 0,
          borderBottom: `2px solid ${ theme.palette.grey[300] }`,
          transition: 'border-color 250ms',
          animation: timing ? 'border-pulse 500ms infinite linear alternate' : 'none',
          position: 'relative',
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
                projects.map(({ id, name, group }) => (
                  <MenuItem
                    key={ `project-${ id }` }
                    value={ id }
                  >{ `${ name } - ${ group }` }</MenuItem>
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
            onKeyDown={ handleKeyDowninTitleInput }
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
              onClick={ handleClickStopTimerAndAddCurrentRecord }
              disabled={ !timing }
              color="error"
            ><StopTimerAndAddCurrentRecordIcon /></Button>
          </ButtonGroup>
        </Stack>

      </Card>
    </Box>
  )
}

EntryForm.propTypes = {
  categories: PropTypes.array.isRequired,
  projects: PropTypes.array.isRequired,
}
