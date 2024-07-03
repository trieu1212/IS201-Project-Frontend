import { createSlice } from "@reduxjs/toolkit";
type AppState = {
    user: null | string,
    accessToken:string,
    refreshToken:string,
    isFetching: boolean,
}
const initialState: AppState = {
    user: null,
    accessToken:'',
    refreshToken:'',
    isFetching: false,
}
const authSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        loginSuccess:(state,action)=>{
            state.accessToken = action.payload.JWTToken.accessToken,
            state.refreshToken = action.payload.JWTToken.refreshToken
        },
        logoutSuccess:(state)=>{
            state.user = null
            state.accessToken = ''
            state.refreshToken = ''
        },
        getCurrentUser:(state,action)=>{
            state.user = action.payload
        }
    }
})

export default authSlice.reducer;
export const {loginSuccess,logoutSuccess,getCurrentUser} = authSlice.actions;

