import { configureStore } from '@reduxjs/toolkit'
import dbmsReducer from '../features/dbmsTypeSlice'

export default configureStore({
  reducer: {
    dbms: dbmsReducer,
  },
})