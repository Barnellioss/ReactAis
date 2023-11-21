import {
  configureStore,
} from '@reduxjs/toolkit'
import messageReducer from './reducers/reducers'




const store = configureStore({
  reducer: {
    state: messageReducer
  }
});


export default store;