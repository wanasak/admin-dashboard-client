import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import FlexBetween from './FlexBetween'
import { setMode } from '../state/state'
import profileImage from '../assets/profile.jpeg'

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <AppBar
      sx={{
        position: 'static',
        background: 'none',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            p='0.1rem 1.5rem'
            gap='3rem'
            borderRadius='9px'
          >
            <InputBase placeholder='Search...'></InputBase>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGTH SIDE */}
        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                gap: '1rem',
                textTransform: 'none',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                component='img'
                alt='profile'
                height='32px'
                width='32px'
                src={profileImage}
                borderRadius='50%'
                sx={{
                  objectFit: 'cover',
                }}
              />
              <Box textAlign='left'>
                <Typography
                  fontSize='0.85rem'
                  fontWeight='bold'
                  sx={{
                    color: theme.palette.secondary[100],
                  }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize='0.75rem'
                  sx={{
                    color: theme.palette.secondary[200],
                  }}
                >
                  {user?.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: '25px',
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <MenuItem>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
