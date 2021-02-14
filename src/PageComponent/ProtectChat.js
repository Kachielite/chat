import React,{useContext} from 'react';
import {Redirect} from 'react-router-dom';
import {FirebaseContext} from './FirebaseConf/Context';
import Chat from './ChatComponent/Chat.js'

const ProtectChat = ()=>{
    let context = useContext(FirebaseContext)
    var user = context.auth.currentUser;


    return(
        <div>
        {user?<Chat/>:<Redirect to="/"/>}
        </div>
    )
}

export default ProtectChat