import { createSlice } from '@reduxjs/toolkit'

export const userconnectionSlice = createSlice({
    name:"userconnection",
    initialState:{
        connected:localStorage.getItem('userConnected'),
        token:localStorage.getItem('userJWT'),
        lang: localStorage.getItem('Language'),
    },
    reducers:{
        setToken: (state, action) => {
            localStorage.setItem('userJWT', action.payload)
            state.token = action.payload
        },
        Connected: (state)=>{
            localStorage.setItem('userConnected', true)
            state.connected = true
        },
        Disconnected: (state)=>{
            localStorage.removeItem('userConnected')
            localStorage.removeItem('userJWT')
            state.token = null
            state.connected = false
        }
    },
})

export const {setToken, Connected, Disconnected} = userconnectionSlice.actions
export default userconnectionSlice.reducer;