import { configureStore } from '@reduxjs/toolkit';
import registrationSlice from './register';

const store = configureStore({
    reducer:{
        register : registrationSlice
    }
})

export default store;