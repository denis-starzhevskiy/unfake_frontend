import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userId: '',
    username: '',
    email: '',
    token: '',
    isOrganization: '',
    isAuth: false,
    isInitialized: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authenticate(state, { payload: {userId, username, email, token, isOrganization, isAuth, isInitialize} }){
            state.userId = userId
            state.username = username
            state.email = email
            state.token = token
            state.isOrganization = isOrganization
            state.isAuth = isAuth
            state.isInitialize = isInitialize
        },
        logout(){
            deleteAllCookies()
            return initialState
        }
    }
})

function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


export const {
    authenticate: authenticateAction,
    logout: logoutAction
} = userSlice.actions

export default userSlice.reducer
