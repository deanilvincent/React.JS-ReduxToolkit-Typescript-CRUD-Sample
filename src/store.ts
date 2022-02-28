import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import employeeSlice from "./features/Employee/employeeSlice";

export const store = configureStore({
    reducer: {
        employee: employeeSlice
    },
});

// dispatch does not take types for thunks into account and thus the return type is typed incorrectly. Please use the actual Dispatch type from the store as decsribed in the documentation. Ref: https://stackoverflow.com/questions/63811401/property-then-does-not-exist-on-type-asyncthunkaction-redux-toolkit
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>