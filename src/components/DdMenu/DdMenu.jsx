import './Menu.css'

import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import BarChartIcon from '@mui/icons-material/BarChart'
import DoorSlidingIcon from '@mui/icons-material/DoorSliding'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Sovelluksen alalaidassa oleva menu-palkki. Linkit etusivulle, tilastosivulle ja logout-sivulle.
const DdMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon htmlColor='white' />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem component={Link} to='/'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Etusivu</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/list/koko_komero'>
          <ListItemIcon><DoorSlidingIcon /></ListItemIcon>
          <ListItemText>Koko Komero</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/add'>
          <ListItemIcon><AddCircleOutlinedIcon /></ListItemIcon>
          <ListItemText>Lisää Komeroon</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/stats'>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText>Tilastot</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to='/logout'>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Kirjaudu ulos</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default DdMenu
