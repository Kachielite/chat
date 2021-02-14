import React,{useContext} from 'react';
import {FirebaseContext} from '../FirebaseConf/Context';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const LoggedInUsersContext = React.createContext()

const LoggedInUsersProvider = (props) =>{

  let context = useContext(FirebaseContext)
  const db = context.db.collection('users')


    const query = db.orderBy('createdAt').limitToLast(25);
  
    const [userList] = useCollectionData(query, { idField: 'id' });


        return(
            <LoggedInUsersContext.Provider value={userList}>
                {props.children}
            </LoggedInUsersContext.Provider>
        )
}

export {LoggedInUsersProvider, LoggedInUsersContext};