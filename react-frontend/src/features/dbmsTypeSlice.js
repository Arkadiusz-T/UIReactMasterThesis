import { createSlice } from '@reduxjs/toolkit'

export const dbmsTypeSlice = createSlice({
  name: 'dbms',
  initialState: {
    value: 'mysql',
  },
  reducers: {
    setMySQL: (state) => {
        state.value = 'mysql'
    },
    setMsSQL: (state) => {
        state.value = 'mssql'
    },
    setOracleDB: (state) => {
        state.value = 'oracledb'
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMySQL, setMsSQL, setOracleDB } = dbmsTypeSlice.actions

export default dbmsTypeSlice.reducer