//React Context API to provide a Firebase instance once at the top-level of your component hierarchy

import React from 'react';
import Firebase from './firebase';

const FirebaseContext = React.createContext(null);



export default Firebase;
export {FirebaseContext,}

