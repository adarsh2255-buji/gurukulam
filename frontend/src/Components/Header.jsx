import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { StudentContext } from '../context/StudentContext';
import { adminContext } from '../context/AdminContext';

const Header = () => {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate()

    const { student, handleLogout } = useContext(StudentContext)
    // const { admin, setAdmin } = useContext(adminContext)

    //pages
    const pages = student ?[
        { name: 'HOME', path: '/' },
        { name: 'DASHBOARD', path: '/dashboard' },
        { name: 'CONTACT', path: '/contact' },
        { name: 'LOGOUT', path: '/logout' },
    ]:
    [
      { name: 'HOME', path: '/' },
      { name: 'CONTACT', path: '/contact' },
      { name: 'REGISTRATION', path: '/registration' },
      { name: 'LOGIN', path: '/login' },
      // { name: 'ADMIN', path: '/admin' },
    ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //handle logout 
  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  }

  return (
    <>
     <AppBar position="static" sx={{background: '#d50000'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            GURUKULAM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
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
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  {
                    page.name === 'LOGOUT' ? (
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
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
          >
            GURUKULAM
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={page.name === 'LOGOUT' ? 'button' : RouterLink}
                to={page.path}
                onClick={page.name === 'LOGOUT' ? handleLogoutClick : handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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

export default Header




// admin ? [
//   { name: 'HOME', path: '/' },
//   { name: 'STUDENTS', path: '/students' },
//   { name: 'CONTACT', path: '/contact' },
//   { name: 'LOGOUT', path: '/logout' },
// ] : 