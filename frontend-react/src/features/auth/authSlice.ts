import {createSlice} from "@reduxjs/toolkit";


const initialState = sessionStorage.getItem('auth') ? JSON.parse(sessionStorage.getItem('auth') as string) : {
    user: null,
    token: null,
    isAuthenticated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {

            // const token = jwt.sign({
            //     user: {
            //         id: user.id,
            //     }
            // }, process.env.JWTKEY || 'secret', {expiresIn: 60 * 60});

            // Guardarlo en el localstorage

            sessionStorage.setItem('auth', JSON.stringify({
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true
            }));
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            sessionStorage.removeItem('auth');
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;