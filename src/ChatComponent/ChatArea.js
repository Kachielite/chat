import React,{useState,useContext,useEffect,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FirebaseContext} from '../FirebaseConf/Context';
import Loading from '../Loading'
import '@firebase/firestore';
import app from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height:'80vh',
    

    
  },
  heading:{
    fontWeight:'bold',
    height:"5vh"
  },
  inputArea: {
    textAlign: 'center',
    margin: '25px auto 2px auto',
  },
  textArea:{
    height:'84vh',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  inputZone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  grow: {
    flexGrow: 1,
  },
  button: {
    padding: theme.spacing(2),
  },
  input: {
      width:'70vw',
  },
  layout:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
  }},
  messageContent:{
    backgroundColor:'#3F51B5',
    color:'white',
    padding:'10px',
    borderRadius:'15px',
    maxWidth:'25rem',
    textAlign:'left'
  },
  msgOwner:{
    fontSize:'0.6rem',
    textAlign:'right'
  }
}));


export default function ChatArea() {
  const classes = useStyles();

  let context1 = useContext(FirebaseContext)
  var user = context1.auth.currentUser.displayName;
  const db = context1.db.collection('messages')
  
  const [message, setMessage] = useState('')



  const onChange = e =>{
    setMessage(e.target.value)
  }

  //Creating new message
  const onSubmit = e =>{
    e.preventDefault()
    
    if(message ===""){
      return;
    } else{
    db.add({
      message: message,
      createdAt:app.firestore.FieldValue.serverTimestamp(),
      createdBy: user,
      time: app.firestore.Timestamp.now().toDate().toString()
      
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      setMessage('')
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }
}


 const query = db.orderBy('createdAt').limitToLast(25);

 const [messages, loading] = useCollectionData(query, { idField: 'id' });

 //Auto-scroll
 const dummy = useRef();

 useEffect(() => {
  dummy.current.scrollIntoView({ behavior: 'smooth' });
}, [messages])

return (
    <div className={classes.root} >
        <div item xs={12}>
          {loading && <Loading/>}
        </div>
      <Grid item xs={12} >
          <div className={classes.textArea}>
          <div style={{overflowY:'scroll' , width:"100%"}}>
          {messages && messages.map((item)=>{
            let msgOwner = item.createdBy
            let time = item.time
            let msgTime = time.slice(0,21)
            return(
              <div className={classes.layout} key={item.id} style={{display:'flex', flexDirection:'column',alignItems:(msgOwner===user)?'flex-end':'flex-start' }}>
                  <div className={classes.messageContent}>
                    <div className={classes.msgOwner}>
                      <p>{msgOwner}</p>
                    </div>
                    <p>{item.message}</p>
                    <div className={classes.msgOwner}>
                    <p>{msgTime}</p>
                    </div>
                  </div>
                </div>
            )
          })
          }
          <span ref={dummy}></span>
          </div>

          </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.inputArea}>
          <div className={classes.grow}>
            <form className={classes.inputZone} noValidate autoComplete="off" onSubmit={onSubmit}>
                <TextField 
                id="standard-size-normal" 
                label="type a message" 
                variant="outlined" 
                className={classes.input}
                value={message}
                onChange={onChange} 
                />
                <Button
                type="submit"
                variant="contained" 
                color="primary" 
                className={classes.button}
                onClick={onSubmit}
                >
                    Send
                </Button>
            </form>
          </div> 
          </div>
      </Grid>
    </div>
  );
}

  