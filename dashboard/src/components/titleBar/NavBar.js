import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, open });
  };

  menuList() {
      const list = [{
        label: 'Scanning Results',
        path: '/',
      }, {
        label: 'Submit Result',
        path: '/form',
      }];
      return <List>
        {list.map((item, index) => (
          <ListItem button key={index} onClick={this.toggleDrawer(false)}>
            <Link to={item.path} style={{ textDecoration: 'none' }}>
              <ListItemText primary={item.label} />
            </Link>
          </ListItem>
        ))}
      </List>;
  }

  render() {
    const { classes } = this.props;
    const { state } = this;

    return <AppBar position="fixed">
        <Drawer open={state.open} onClose={this.toggleDrawer(false)}>
          {this.menuList()}
        </Drawer>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={this.toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>;
  }
}

const useStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

export default withStyles(useStyles)(NavBar);
