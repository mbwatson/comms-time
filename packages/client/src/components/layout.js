import PropTypes from 'prop-types'
import { Box, Collapse, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import {
  Settings as ConfigIcon,
  Alarm as TimerIcon,
} from '@mui/icons-material'
import { useTimer } from '../context'
import { EntryForm } from '../components/entry-form'

const msToHHMMSS = function(milliseconds) {
  const seconds = parseInt(milliseconds / 1000, 10)
  let hh = Math.floor(seconds / 3600)
  let mm = Math.floor((seconds - (hh * 3600)) / 60)
  let ss = seconds - (hh * 3600) - (mm * 60)
  if (hh < 10) { hh = '0' + hh }
  if (mm < 10) { mm = '0' + mm }
  if (ss < 10) { ss = '0' + ss }
  return hh + ':' + mm + ':' + ss
}

const Menu = () => {
  const { timing, runtime } = useTimer()

  return (
    <Stack
      direction="row"
      component="nav"
      alignItems="center"
    >
      <NavLink to="/" end>
        <Stack direction="column" justifyContent="center" alignItems="center">
          <TimerIcon sx={{ color: '#567' }} />
          <Collapse in={ timing }>
            <Typography variant="caption">{ msToHHMMSS(runtime) }</Typography>
          </Collapse>
        </Stack>
      </NavLink>
      <NavLink to="/config"><ConfigIcon sx={{ color: '#567' }} /></NavLink>
    </Stack>
  )
}

export const Layout = ({ children }) => {
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
        height: '4rem',
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
            minWidth: '85px',
            color: '#345',
            textDecoration: 'none',
            transition: 'background-color 250ms',
            '&.active': {
              backgroundColor: '#66778822',
              ':hover': {
                backgroundColor: '#66778822',
              },
            },
            ':hover': {
              backgroundColor: '#66778811',
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
