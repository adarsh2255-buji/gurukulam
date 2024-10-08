import React, { useContext, useState } from 'react'

import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, Container, IconButton, Menu, Toolbar, Typography, Tooltip, Avatar, MenuItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { TeacherContext } from '../../context/teacherContext';

const TeacherHeader = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();
    const { teacher, handleLogout } = useContext(TeacherContext)

    const pages = teacher ?[
        { name : 'HOME', path: '/home'},
        { name : 'LOGOUT', path: '/logout'},
    ] : [];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

     
  const handleLogoutClick = () => {
    handleLogout()
    navigate('/teacher');
  }

  return (
    <>
     <AppBar position='static' sx={{ background: '#d50000' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />
          <Typography
          variant='h6'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          >GURUKULAM</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {
                    page.name === 'LOGOUT'? (
                      <Typography sx={{ textAlign: 'center' }} onClick={handleLogoutClick}>{page.name}</Typography>
                    ) : (
                      <Typography sx={{ textAlign: 'center' }} component={RouterLink} to={page.path}>{page.name}</Typography>
                    )
                  }
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
          variant='h5'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
          >GURUKULAM</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {
              pages.map((page) => (
                <Button key={page.name}
                component={page.name === 'LOGOUT' ? 'button' : RouterLink}
                to={page.path}
                onClick={page.name === 'LOGOUT' ? handleLogoutClick : handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              ))
            }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                {
                  teacher? (
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  ) : (
                    ""
                  )
                }
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}

export default TeacherHeader