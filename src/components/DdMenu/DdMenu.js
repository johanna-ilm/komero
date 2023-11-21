import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import {Dropdown, DropdownMenuItem} from '../Dropdown/Dropdown';


// Sovelluksen alalaidassa oleva menu-palkki. Linkit etusivulle, tilastosivulle ja logout-sivulle. 
export default function DdMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    /*<Dropdown
      keepOpen
      open={open}
      trigger={<Button><MoreVertIcon htmlColor="white" /></Button>}
      menu={[
        <DropdownMenuItem component={Link} to='/'>
          <HomeIcon />Etusivu 
        </DropdownMenuItem>,
        <DropdownMenuItem component={Link} to='/list/koko_komero'>
          <DoorSlidingIcon />Koko Komero 
        </DropdownMenuItem>,
        <DropdownMenuItem component={Link} to='/add'>
          <AddCircleOutlinedIcon />Lisää Komeroon 
        </DropdownMenuItem>,
        <DropdownMenuItem component={Link} to='/stats'>
          <BarChartIcon />Tilastot 
        </DropdownMenuItem>,
        <DropdownMenuItem component={Link} to='/logout'>
          <LogoutIcon />Kirjaudu ulos 
        </DropdownMenuItem>,
      ]}
    />*/
    <>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <MoreVertIcon htmlColor="white" />
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
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
  );
};


/*
  return (
    <div className="menu">
      <div className="menu__container">
        <Link to="/"><div><Home htmlColor="#fff" /></div></Link>
        <Link to="/stats"><div><BarChart htmlColor="#fff" /></div></Link>
        <Link to="/logout"><div className="menu__button"><img src={logout} alt="logout" /></div></Link>
      </div>
    </div>
  );
}*/