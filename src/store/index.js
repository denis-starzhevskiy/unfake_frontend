import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from '../store/slices/userSlice'

export const store = configureStore({
    reducer: combineReducers({
        user: userReducer
    })
})
