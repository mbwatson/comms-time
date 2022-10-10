import { Fragment, useMemo } from 'react'
import {
  Box, Button, Card, CardContent, CardHeader, Checkbox, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack,
  Typography, useMediaQuery, useTheme,
} from '@mui/material'
import { MoreTime as AddIcon } from '@mui/icons-material'
import { useTimer } from '../context'
import { FiberManualRecord as DotIcon } from '@mui/icons-material'

export const ConfigView = () => {
  const theme = useTheme()
  const { categories, projects, config, setConfig, record, addFakeRecord } = useTimer()
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
  }, [])

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
            Select the projects and categories below
            that you wish to appear as options in the application timer.
            The project and timer used in a running timer are
            unavailable for toggling while that timer runs.
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
        <CardHeader title="Generate Records" />

        <Divider />
        
        <CardContent>
          <Button
            variant="outlined"
            onClick={ addFakeRecord }
            startIcon={ <AddIcon /> }
          >Add Fake Record</Button>
        </CardContent>
      </Card>
    </Fragment>
  )
}
