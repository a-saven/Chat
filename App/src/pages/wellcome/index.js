import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Copyright from '../../components/common/copyright';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border:"medium solid lightgrey",
    borderRadius: '5px',
    padding: theme.spacing(5, 5, 5)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    height: '7vh',
    width: '7vh',
  },
}));

const Page = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        direction="column"
        spacing={0}
        align="center"
        justify="center"
       
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src='images/avatars/chatBot.png' />
          <Typography component="h1" variant="h5">
              Hi, I'm Sally
          </Typography>
            <Grid container spacing={2}>
              <Grid item>
                  <h2>Your Personal</h2>
                  <h2>Virtual Healthcare Assistant</h2>
                  <h3>Please use your link</h3>
                  <h3>or</h3>
              </Grid>
            </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                href='/login'
              >
              login
              </Button>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Container>
  )
} 

export default Page;