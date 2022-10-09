import PropTypes from 'prop-types'
import { Box, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { Settings as ConfigIcon } from '@mui/icons-material'

const Menu = () => {
  return (
    <Stack
      direction="row"
      component="nav"
      alignItems="center"
    >
      <NavLink to="/">Timer</NavLink>
      <NavLink to="/config"><ConfigIcon /></NavLink>
    </Stack>
  )
}

export const Layout = ({ children }) => {
  const headerHeight = '5rem'

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
        position: 'sticky', top: 0, left: 0, width: '100%',
        height: headerHeight,
        backgroundColor: '#66778811',
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
            color: '#678',
            textDecoration: 'none',
            ':active': {
              color: '#79e',
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
