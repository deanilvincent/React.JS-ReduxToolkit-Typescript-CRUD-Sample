import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { IEmployee } from "../../models/employee";

export const getEmployees = createAsyncThunk("employee/getEmployees", async () => {
    try {
        const response = await API.get("employees")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addEmployee = createAsyncThunk("employee/addEmployee", async (employee: IEmployee) => {
    try {
        const response = await API.post("employees", employee)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateEmployee = createAsyncThunk("employee/updateEmployee",
    async (employee: IEmployee) => {
        try {
            const response = await API.put(`employees/${employee.employeeId}`, employee);
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (employeeId: number) => {
    try {
        const response = await API.delete(`employees/${employeeId}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})