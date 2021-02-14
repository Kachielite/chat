import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {LoggedInUsersContext} from '../LoggedInUsers/LoggedInUsersContext';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ChatList(props) {
  const classes = useStyles();

  const userList = useContext(LoggedInUsersContext)

  return (
    <div>
    {userList.map((item,index)=>{
      return(
        <div className={classes.root} key={index}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
           <ListItemAvatar>
            <Avatar alt={item.user} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={item.user}
          />
          </ListItem>
        </List>
        <Divider />
      </div>
      )
    })}
  </div>
  );
}