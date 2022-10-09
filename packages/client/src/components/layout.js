import PropTypes from 'prop-types'
import { Badge, Box, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {
  Settings as ConfigIcon,
  Timer as LogIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'
import { EntryForm } from '../components/entry-form'

const Menu = () => {
  const { timing } = useTimer()
  return (
    <Stack
      direction="row"
      component="nav"
      alignItems="center"
    >
      <NavLink exact to="/">
        <Badge
          color="secondary"
          variant="dot"
          invisible={ !timing }
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ 
            '.MuiBadge-dot': {
              transform: `translate3D(0, -1px, 0)`,
              animation: timing ? 'opacity-pulse 500ms infinite linear alternate' : 'none',
            },
          }}
        ><LogIcon sx={{ color: '#567' }} /></Badge>
      </NavLink>
      <NavLink exact to="/config"><ConfigIcon sx={{ color: '#567' }} /></NavLink>
    </Stack>
  )
}

export const Layout = ({ children }) => {
  const headerHeight = '3rem'
  const { categories, projects, config } = useTimer()

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      minHeight: '100vh',
      position: 'relative',
      '& header': {
        zIndex: 9,
        position: 'sticky', top: 0, left: 0, width: '100%',
        height: headerHeight,
        backgroundColor: '#66778866',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        '& nav': {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          '& a': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            color: '#345',
            textDecoration: 'none',
            transition: 'background-color 250ms',
            ':active': {
              color: '#567',
            },
            ':hover': {
              backgroundColor: '#66778833',
            },
          },
        },
      },
      '& main': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        width: '100%',
      },
      '& footer': {
        height: headerHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        color: '#acb',
      },
    }}>
      <Box component="header">
        <Menu />
      </Box>
      <EntryForm
        categories={ [...categories.filter(c => !config.hiddenCategories.has(c.id))] }
        projects={ [...projects.filter(p => !config.hiddenProjects.has(p.id))] }
      />
      <Stack
        component="main"
        direction="column"
        gap={ 4 }
      >{ children }</Stack>
      <Box component="footer">
        &copy; { new Date().getFullYear() }
      </Box>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
