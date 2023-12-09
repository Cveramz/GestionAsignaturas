import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Drawer, IconButton, List, Hidden } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const CustomButton = styled(Button)({
  color: 'white',
});

const useStyles = {
  appBar: {
    backgroundColor: '#394049',
  },
  logo: {
    width: '150px', 
  },
  drawerPaper: {
    width: '60%',
  },
  menuButton: {
    marginLeft: 'auto',
  },
};

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static" sx={useStyles.appBar}>
        <Toolbar>
          <img src="https://idi.fing.usach.cl/wp-content/uploads/2021/11/FING-horizontal-blanco.png" alt="logo" style={useStyles.logo} />
          <Hidden mdUp>
            <IconButton color="inherit" onClick={handleDrawerOpen} style={useStyles.menuButton}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Inicio</CustomButton>
            </Link>
            <Link to="/GestionarAsignaturas" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Gestionar Asignaturas</CustomButton>
            </Link>
            <Link to="/GestionarEstudiantes" style={{ textDecoration: 'none', color: 'inherit' }}>
              <CustomButton>Gestionar Estudiantes</CustomButton>
            </Link>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        classes={{ paper: useStyles.drawerPaper }}
      >
        <List>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button onClick={handleDrawerClose} fullWidth>
              Inicio
            </Button>
          </Link>
          <Link to="/GestionarAsignaturas" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button onClick={handleDrawerClose} fullWidth>
              Gestionar Asignaturas
            </Button>
          </Link>
          <Link to="/GestionarEstudiantes" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button onClick={handleDrawerClose} fullWidth>
              Gestionar Estudiantes
            </Button>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;
