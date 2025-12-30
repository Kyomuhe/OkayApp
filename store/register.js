import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    problem: '',
    problemDetails: '',
    accountType: '',
    speciality: '',
    professionalDetails: '',
};

const registrationSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setAccountType: (state, action) => {
            state.accountType = action.payload;
        },
        resetRegistration: () => initialState,

    },
});

export const { setAccountType, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;