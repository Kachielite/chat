import React,{useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ChatBubble from '@material-ui/icons/Chat';
import {FirebaseContext} from '../FirebaseConf/Context';
import Loading from '../Loading'
import {Link} from 'react-router-dom';

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

export default function ForgetPassword() {
  const classes = useStyles();

  const context = useContext(FirebaseContext)

  const [userCredentials, setUserCredentials] = useState({})
  const [submitState,setSubmitState]= useState('')
  const [display,setDisplay]= useState(false)
  const [verified,setVerified]= useState(true)

  const onChangeEmail = event=> {
    event.target === ""?setVerified(true):setVerified(false)
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }


  
  const onSubmit =(e)=>{

    setDisplay(true)
    setSubmitState('')
    e.preventDefault()
    
    
    const { email } = userCredentials;
 
    context
      .doPasswordReset(email)
      .then(() => {
        setDisplay(false)
        setSubmitState('Check your email for the reset password link')
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
          Reset Password
        </Typography>
        <Grid item xs={12} >
            <Typography variant="body2" color="secondary" align="center">
              {submitState}
            </Typography>
            </Grid>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div item xs={12}>
          {display && <Loading/>}
        </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeEmail}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onSubmit={onSubmit}
            disabled={verified}
          >
            Reset Password
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/' variant="body2">
                Sign In?
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