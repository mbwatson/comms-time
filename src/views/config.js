import { Fragment, useMemo } from 'react'
import {
  Box, Button, Card, CardContent, CardHeader, Checkbox, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack,
  Typography, useMediaQuery, useTheme,
} from '@mui/material'
import {
  DeleteForever as ClearAllIcon,
  MoreTime as AddIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'
import { FiberManualRecord as DotIcon } from '@mui/icons-material'

export const ConfigView = () => {
  const theme = useTheme()
  const { categories, projects, config, setConfig, record, addFakeRecord, clearRecords } = useTimer()
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const handleClickCategoryCheckbox = categoryId => () => {
    let newVisibleCategories = new Set(config.hiddenCategories)
    if (newVisibleCategories.has(categoryId)) {
      newVisibleCategories.delete(categoryId)
    } else {
      newVisibleCategories.add(categoryId)
    }
    setConfig({ ...config, hiddenCategories: newVisibleCategories })
  }

  const handleClickProjectCheckbox = projectId => () => {
    let newHiddenProjects = new Set(config.hiddenProjects)
    if (newHiddenProjects.has(projectId)) {
      newHiddenProjects.delete(projectId)
    } else {
      newHiddenProjects.add(projectId)
    }
    setConfig({ ...config, hiddenProjects: newHiddenProjects })
  }

  const projectOptions = useMemo(() => {
    return [
      ...projects.map(project => {
        const labelId = `project-${ project.id }-label`
        return (
          <ListItem key={ `project-${ project.id }` } disablePadding>
            <ListItemButton
              role={ undefined }
              onClick={ handleClickProjectCheckbox(project.id) }
              dense
              disabled={ record.project === project.id }
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={ !config.hiddenProjects.has(project.id) } 
                  tabIndex={ -1 }
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                id={ labelId }
                primary={ <Typography variant="body1">{ project.name }</Typography> }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, 'svg': { transform: 'scale(0.75)' } }}>
                    <Typography variant="caption">{ project.group.name }</Typography> <DotIcon sx={{ color: project.group.color }} fontSize="small" />
                  </Box>
                }
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  '.MuiListItemText-secondary': { color: theme.palette.text.secondary }
                }}
              />
            </ListItemButton>
          </ListItem>
        )
      })
    ]
  }, [projects, config.hiddenProjects, record.project])

  return (
    <Fragment>
      <Card sx={{
        '.scrollable-list': {
          flex: 1,
          maxHeight: '33vh',
          overflowY: 'scroll',
        }
      }}>
        <CardHeader title="Configuration" />
        
        <CardContent>
          <Typography paragraph>
            Projects and categories selected here will appear as options in the application timer.
          </Typography>
        </CardContent>
      
        <Divider />

        <CardContent>
          <Stack direction={{ sx: 'column', sm: 'row' }} gap={ 2 }>
            <Box className="scrollable-list">
              <Typography variant="h6">Projects</Typography>
              <List>
                { projectOptions }
              </List>
            </Box>

            { isSmallScreen ? <Divider /> : <Divider orientation="vertical" flexItem /> }

            <Box className="scrollable-list">
              <Typography variant="h6">Categories</Typography>
              <List>
                {
                  categories.map(category => {
                    const labelId = `category-${ category.id }-label`
                    return (
                      <ListItem key={ `category-${ category.id }` } disablePadding>
                        <ListItemButton
                          role={ undefined }
                          onClick={ handleClickCategoryCheckbox(category.id) }
                          dense
                          disabled={ record.category === category.id }
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={ !config.hiddenCategories.has(category.id) } 
                              tabIndex={ -1 }
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            disableTypography
                            id={ labelId }
                            primary={ <Typography variant="body1">{ category.name }</Typography> }
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
              </List>
            </Box>

          </Stack>

        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Danger Zone" />

        <Divider />

        <CardContent>
          <Stack
            direction={{ sx: 'column', sm: 'row' }}
            gap={ 2 }
            divider={ isSmallScreen ? <Divider /> : <Divider orientation="vertical" flexItem /> }
          >
            <Stack
              direction="column"
              gap={ 4 }
              sx={{ flex: 1, '.MuiBox-root': { flex: 1 } }}>
              <Box>
                <Typography variant="h6">Generate Time Records</Typography>
                <Typography paragraph>
                  Each record will be generated with a random project and category.
                  However, as of now, start times will be between 30 and 10 minutes
                  ago, and end times will be between 20 and 20 minutes ago.
                  All of this is to say that the generated records will probably overlap.
                </Typography>
                <Typography paragraph>
                  This functionality was built to help with testing this
                  interface, but it&apos;s fun to play with, so it stays in!
                </Typography>
              </Box>

              <Stack justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  onClick={ addFakeRecord }
                  startIcon={ <AddIcon /> }
                >Generate one record</Button>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              gap={ 4 }
              sx={{ flex: 1, '.MuiBox-root': { flex: 1 } }}>
              <Box>
                <Typography variant="h6">Delete Records</Typography>

                <Typography paragraph>
                  This will clear all time records. Proceed with caution. <em>This cannot be undone</em>.
                </Typography>
              </Box>

              <Stack justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  onClick={ clearRecords }
                  color="warning"
                  startIcon={ <ClearAllIcon /> }
                >Delete all records</Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Fragment>
  )
}


