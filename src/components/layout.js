import PropTypes from 'prop-types'
import { Box, Collapse, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {
  AccessTime as TimerIcon,
  BarChart as ReportsIcon,
  Settings as ConfigIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'
import { EntryForm } from '../components/timer'
import { msToHHMMSS } from '../util'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Menu = () => {
  const theme = useTheme()
  const { timing, runtime } = useTimer()

  return (
    <Stack direction="row" component="nav" alignItems="center" sx={{
      '.MuiSvgIcon': { color: theme.palette.background.paper }
    }}>
      <NavLink to="/" end>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <TimerIcon />
          <Collapse in={ timing }>
            <Typography variant="caption">{ msToHHMMSS(runtime) }</Typography>
          </Collapse>
        </Stack>
      </NavLink>
      <NavLink to="/reports"><ReportsIcon /></NavLink>
      <NavLink to="/config"><ConfigIcon /></NavLink>
      <a href="https://github.com/mbwatson/comms-time" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
    </Stack>
  )
}

export const Layout = ({ children }) => {
  const theme = useTheme()
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
      backgroundColor: theme.palette.background.default,
      '.Toastify__toast-container.Toastify__toast-container--bottom-left': {
        mx: 2, my: 4,
        '.Toastify__toast-body': {
          gap: 2,
        },        
      },
      '& header': {
        zIndex: 9,
        position: 'sticky', top: 0, left: 0, width: '100%',
        height: '4rem',
        backgroundColor: theme.palette.primary.dark,
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
            minWidth: '85px',
            color: theme.palette.background.paper,
            textDecoration: 'none',
            transition: 'background-color 250ms',
            '&.active': {
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              ':hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
              },
            },
            ':hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
          },
        },
      },
      '& main': {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        width: '100%',
        gap: 2,
      },
      '& footer': {
        height: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.background.paper,
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
      <ToastContainer
        position="bottom-left"
        autoClose={ 5000 }
        newestOnTop={ false }
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
