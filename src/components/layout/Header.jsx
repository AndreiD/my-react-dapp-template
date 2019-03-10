import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 5,
  },
  button: {
    margin: 15,
  }
}

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <i className="material-icons">cloud</i>
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          your super dapp
      </Typography>
        <Button className={classes.button} color="inherit"><i className="material-icons">person</i>action</Button>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(Header);
