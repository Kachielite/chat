import React,{useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link, useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ChatBubble from '@material-ui/icons/Chat';
import {FirebaseContext} from './FirebaseConf/Context';
import Loading from './Loading'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        madumere {' '}
      { new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const context =useContext(FirebaseContext)
  
  const [userCredentials, setUserCredentials] = useState({})

  const [submitState,setSubmitState]= useState('')
  const [display,setDisplay]= useState(false)

  const onChangeUsername = event=> {
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }

  const onChangeEmail = event=> {
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }

  const onChangePassword = event=> {
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }

  let history = useHistory();

  const redirect = () => {
    history.push('/')
  }

  const onSubmit =(e)=>{
    e.preventDefault()
    setDisplay(true)
    setSubmitState('')
    const { username,email, password } = userCredentials;
 
    context
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        context.auth.currentUser.updateProfile({displayName: username})
        setSubmitState('')
            setDisplay(false)
            redirect()
      })
      .catch(error => {
        setDisplay(false)
        setSubmitState(error.message)
      });
  }
   

 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ChatBubble />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Creation
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Typography component="h1" variant="h5">
            {display && <Loading/>}
            </Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} >
            <Typography variant="body2" color="secondary" align="center">
              {submitState}
            </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={onChangeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={onChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangePassword}
               
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}