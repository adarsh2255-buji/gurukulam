import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Container, IconButton, Menu, Toolbar, Typography, Tooltip, Avatar, MenuItem } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import { TeacherContext } from '../../context/teacherContext';

const TeacherHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElStudent, setAnchorElStudent] = useState(null); // For students dropdown
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null); // For nested submenu (Attendance, Student List)

  const navigate = useNavigate();
  const { teacher, handleLogout } = useContext(TeacherContext);

  const pages = teacher
    ? [
        { name: 'HOME', path: '/home' },
        { name: 'STUDENTS' },
        { name: 'LOGOUT', path: '/logout' },
      ]
    : [];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/teacher');
  };

  const handleOpenStudentMenu = (event) => {
    setAnchorElStudent(event.currentTarget);
  };

  const handleCloseStudentMenu = () => {
    setAnchorElStudent(null);
    setSubMenuAnchorEl(null); // Close submenu when closing main menu
  };

  const handleOpenSubMenu = (event) => {
    setSubMenuAnchorEl(event.currentTarget); // Open submenu when clicking "STUDENTS"
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
  };

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
            >
              GURUKULAM
            </Typography>

            {/* Mobile Menu Icon */}
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
                  page.name === 'STUDENTS' ? (
                    <MenuItem key={page.name} onClick={handleOpenSubMenu}>
                      {page.name}
                    </MenuItem>
                  ) : (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      {page.name === 'LOGOUT' ? (
                        <Typography onClick={handleLogoutClick} sx={{ textAlign: 'center' }}>{page.name}</Typography>
                      ) : (
                        <Typography component={RouterLink} to={page.path} sx={{ textAlign: 'center' }}>{page.name}</Typography>
                      )}
                    </MenuItem>
                  )
                ))}

                {/* Submenu for Students (Mobile) */}
                <Menu
                  anchorEl={subMenuAnchorEl}
                  open={Boolean(subMenuAnchorEl)}
                  onClose={handleCloseSubMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem component={RouterLink} to="/teacher/attendance" onClick={handleCloseSubMenu}>
                    Attendance
                  </MenuItem>
                  <MenuItem component={RouterLink} to="/teacher/classStudentsList" onClick={handleCloseSubMenu}>
                    Student List
                  </MenuItem>
                </Menu>
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
            >
              GURUKULAM
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) =>
                page.name === 'STUDENTS' ? (
                  <Box key={page.name} sx={{ position: 'relative' }}>
                    <Button
                      onMouseEnter={handleOpenStudentMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                    <Menu
                      anchorEl={anchorElStudent}
                      open={Boolean(anchorElStudent)}
                      onClose={handleCloseStudentMenu}
                      MenuListProps={{
                        onMouseLeave: handleCloseStudentMenu,
                      }}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem component={RouterLink} to="/teacher/attendance">
                        Attendance
                      </MenuItem>
                      <MenuItem component={RouterLink} to="/teacher/classStudentsLIst">
                        Student List
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={page.name}
                    component={page.name === 'LOGOUT' ? 'button' : RouterLink}
                    to={page.path}
                    onClick={page.name === 'LOGOUT' ? handleLogoutClick : handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                )
              )}
            </Box>

            {/* Avatar and Settings */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  {teacher ? <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> : ""}
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
                onClose={handleCloseNavMenu}
              >
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default TeacherHeader;
