import {configureStore} from '@reduxjs/toolkit'
//import counterReducer from './counter'
import userconnectionReducer from './userconnection'

export default configureStore({
    reducer: {
        userconnection: userconnectionReducer
    }
});