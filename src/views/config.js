import { Fragment } from 'react'
import {
  Box, Button, Card, CardContent, CardHeader, Checkbox, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack,
  Typography, useMediaQuery,
} from '@mui/material'
import { MoreTime as AddIcon } from '@mui/icons-material'
import { useTimer } from '../context'

export const ConfigView = () => {
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

  return (
    <Fragment>
      <Card sx={{
        backgroundColor: '#66778811',
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
          </Typography>
        </CardContent>
      
        <Divider />

        <CardContent>
          <Stack direction={{ sx: 'column', sm: 'row' }} gap={ 2 }>
            <Box className="scrollable-list">
              <Typography variant="h6">Projects</Typography>
              <List>
                {
                  projects.map(project => {
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
                          <ListItemText id={ labelId } primary={ project.name } />
                        </ListItemButton>
                      </ListItem>
                    )
                  })
                }
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
                          <ListItemText id={ labelId } primary={ category.name } />
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
