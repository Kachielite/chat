import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChatArea from './ChatArea';
import ChatList from './ChatList';
import {FirebaseContext} from '../FirebaseConf/Context';
import './App.css';


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  chatArea: {
    textAlign: 'center',
    height:'94vh',
  },

  chatList: {
    padding:'0px 20px',
    textAlign: 'center',
    height: '70vh',
    width:'20vw',

  },
  title: {
    flexGrow: 1,
  },
}));

function Chat(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const onlineUsers =[]


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let context = useContext(FirebaseContext)
  var user = context.auth.currentUser.displayName;
 
  const loggedOut = ()=>{
        //Register logged user
        const db = context.db.collection('users')
        
         db.where("user","==",user).get()
         .then(querySnapshot => {
             querySnapshot.docs[0].ref.delete();
         });
  }


  const signOut =()=>{
    context.doSignOut()
    loggedOut()
    redirect()
  }


  let history = useHistory();

  const redirect = () => {
    history.push('/')
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography variant="h6" noWrap style={{textAlign:'center'}}>
            Users
        </Typography>
      <Divider />
      <ChatList  chatList={onlineUsers}/>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            {context.auth.currentUser.displayName}
          </Typography>
          <Button color="inherit" onClick={signOut}>Logout</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
            <Grid container>
              <Grid item xs={12} >
                <div className={classes.chatArea} >
                  <ChatArea/>
                </div>
              </Grid>
        </Grid>
      </div>
      </main>
    </div>
  );
}

Chat.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Chat;