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
            state.user = action.payload.user
            state.accessToken = action.payload.JWTToken.accessToken,
            state.refreshToken = action.payload.JWTToken.refreshToken
        }
    }
})

export default authSlice.reducer;
export const {loginSuccess} = authSlice.actions;

