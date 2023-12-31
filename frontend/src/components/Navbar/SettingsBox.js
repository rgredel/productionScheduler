import * as React from 'react';
import { useLocalState } from '../../util/useLocalStorage';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

function SettingsBox() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [anchorElUser, setAnchorElUser] = React.useState();

        const handleLogout = () => {
            window.location.href = "/logout"
         };

          const handleOpenUserMenu = (event) => {
            setAnchorElUser(event.currentTarget);
          };
        
          const handleCloseUserMenu = () => {
            setAnchorElUser(null);
          };

          return (
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
          );

}

export default SettingsBox;