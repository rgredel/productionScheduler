import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
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
import Logo from './pk.webp';

const pages = [];
const settings = ['Konto', 'Wyloguj'];

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [anchorElNav, setAnchorElNav] = React.useState();
    const [anchorElUser, setAnchorElUser] = React.useState();

    React.useEffect(() => {
        if(jwt) {
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false) 
        }},[jwt])

    const handleLogout = () => {
      alert("Wylogowano")
            setJwt("");
            setIsLoggedIn(false);
          };


          const handleOpenNavMenu = (event) => {
            setAnchorElNav(event.currentTarget);
          };
          const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
          };
        
          const handleCloseNavMenu = () => {
            setAnchorElNav(null);
          };
        
          const handleCloseUserMenu = () => {
            setAnchorElUser(null);
          };

          return (
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                  <img
                    src={Logo}
                    style={{ display: { xs: 'none', md: 'flex' },
                     marginRight: 1 ,
                     maxWidth: '50px',
                     height: 'auto',}}
                  />
                  </Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
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
                    WIEiK
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
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                <NavLink to="/" activeClassName="active-link">
                        <MenuItem key="Procesy produkcyjne" containerElement={<React.Link to="/" />}>
                          <Typography textAlign="center">Procesy produkcyjne</Typography>
                        </MenuItem>
                </NavLink>

                    </Menu>
                  </Box>
                  <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                  <img
                    src={Logo}
                    style={{
                     marginRight: 1 ,
                     maxWidth: '50px',
                     height: 'auto'}}
                  />
                  </Box>
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
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
                    WIEiK
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      <Button
                        key="Procesy produkcyjne"
                        href="/"
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                      Procesy produkcyjne
                      </Button>
                  </Box>
                  </Box>
        
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                        <MenuItem key="Konto" onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Konto</Typography>
                        </MenuItem>
                        <MenuItem key="Wyloguj" onClick={handleLogout}>
                          <Typography textAlign="center">Wyloguj</Typography>
                        </MenuItem>
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          );

  }

export default Navbar;