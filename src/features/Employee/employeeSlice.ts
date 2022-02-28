import { createSlice } from "@reduxjs/toolkit";
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from "./employeeApi";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        list: {
            isLoading: false,
            status: "",
            values: []
        },
        save: {
            isSaving: false,
            isDeleting: false
        }
    },
    reducers: {
        clearSuccessMessage: (state, payload) => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: {
        [getEmployees.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getEmployees.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getEmployees.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addEmployee.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addEmployee.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addEmployee.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateEmployee.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [updateEmployee.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [updateEmployee.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        [deleteEmployee.pending.type]: (state, action) => {
            state.save.isDeleting = true
        },
        [deleteEmployee.fulfilled.type]: (state, action) => {
            state.save.isDeleting = false
        },
        [deleteEmployee.rejected.type]: (state, action) => {
            state.save.isDeleting = false
        }
    }
})

export default employeeSlice.reducer
