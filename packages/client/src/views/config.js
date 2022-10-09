import {
  Card, CardHeader, Checkbox, Divider,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack,
} from '@mui/material'
import { useTimer } from '../context'

export const ConfigView = () => {
  const { categories, projects, config, setConfig } = useTimer()

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
    <Stack direction={{ sm: 'column', md: 'row' }} gap={ 4 }>
      <Card
        variant="outlined"
        sx={{ backgroundColor: '#66778811', flex: 1 }}
      >
        <CardHeader title="Projects" />
        
        <Divider />

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
      </Card>

      <Card
        variant="outlined"
        sx={{ backgroundColor: '#66778811', flex: 1 }}
      >
        <CardHeader title="Categories" />
        <Divider />
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
      </Card>

    </Stack>
  )
}
