import { createSlice } from "@reduxjs/toolkit";
type AuthState = {
    currentUser: null | string,
    isFetching: boolean,
    isError: boolean,
    isSuccess: boolean
}
const initialState: AuthState = {
    currentUser: null,
    isFetching: false,
    isError: false,
    isSuccess: false
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        registerStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
            state.isSuccess = false;
        },
        registerSuccess:(state, action)=>{
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.currentUser = action.payload;
        },
        registerError:(state)=>{
            state.isFetching = false;
            state.isError = true;
            state.isSuccess = false;
        }
    }
})

export default authSlice.reducer;
export const {registerStart,
            registerSuccess,
            registerError } = authSlice.actions;

