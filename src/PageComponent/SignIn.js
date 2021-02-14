import React,{useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link,useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ChatBubble from '@material-ui/icons/Chat'
import {FirebaseContext} from '../FirebaseConf/Context';
import {LoggedInUsersContext} from '../LoggedInUsers/LoggedInUsersContext';
import Loading from '../Loading'
import app from 'firebase/app';




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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  


  const [userCredentials, setUserCredentials] = useState({})

  const [submitState,setSubmitState]= useState('Please sign in to access the chat room')
  const [display,setDisplay]= useState(false)


  const onChangeEmail = event=> {
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }

  const onChangePassword = event=> {
    setUserCredentials({...userCredentials,[event.target.name]:event.target.value})
  }



  let history = useHistory();

  const redirect = () => {
    history.push('/chat')
  }

  const context = useContext(FirebaseContext)
  const db = context.db.collection('users')
  const contextUser = useContext(LoggedInUsersContext)
 


  const userIn = []
  contextUser && contextUser.map((item)=> userIn.push(item.user))


  const onSubmit =(e)=>{
    e.preventDefault()
    setDisplay(true)
    setSubmitState('')
    
    const { email, password } = userCredentials;
 
    context
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        setSubmitState('')
          setDisplay(false)

          if(userIn.includes(context.auth.currentUser.displayName)){
            redirect()
          } else{
            db.add({
              user: context.auth.currentUser.displayName,
              createdAt: app.firestore.FieldValue.serverTimestamp(),      
          })
          redirect()
          }
            
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
          Chat App
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
            onChange={onChangePassword }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgotten-password' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/sign-up' variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

