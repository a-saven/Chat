import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    borderRadius: theme.shape.borderRadius,
    position: "static"
  }
}));

export default function ButtonAppBar() {
  const cls = useStyles();

  return (
    <div className={cls.root}>
      <AppBar className={cls.bar} >
        <Toolbar>
          <IconButton edge="start" className={cls.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={cls.title}>
            <div>Sally - Virtual Healthcare Assistant</div>
          </Typography>
          <Button color="inherit"><AccountCircleIcon/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}