import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IEmployee, IEmployeeList } from "../../models/employee";
import { useAppDispatch } from "../../store";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeeApi";
import moment from "moment";

export const Employee: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const employeeList = useSelector((state: any) => state.employee.list.values);
  const isSaving = useSelector((state: any) => state.employee.save.isSaving);

  const [employee, setEmployee] = useState<IEmployee>({
    employeeId: 0,
    name: "",
    birthday: moment(new Date()).format("YYYY-MM-DD"),
    isActive: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectEmployee = (d: IEmployee) => {
    setEmployee({
      employeeId: d.employeeId,
      name: d.name,
      isActive: d.isActive,
      birthday: moment(d.birthday).format("YYYY-MM-DD"),
    });
  };

  const removeEmployee = (id: number) => {
    if (id)
      dispatch(deleteEmployee(id))
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const action =
      employee.employeeId === 0
        ? addEmployee(employee)
        : updateEmployee(employee);

    dispatch(action)
      .unwrap()
      .then((response) => {
        alert(response);
        resetForm();
        dispatch(getEmployees());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setEmployee({
      employeeId: 0,
      name: "",
      isActive: false,
      birthday: new Date(),
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={employee.name}
        />
        <input
          type="checkbox"
          name="isActive"
          onChange={handleInputChange}
          defaultChecked={employee.isActive}
        />
        <input
          type="date"
          name="birthday"
          onChange={handleInputChange}
          value={employee.birthday}
          min="2020-01-01"
          max="2100-01-01"
        />
        <button onClick={submit} disabled={isSaving}>
          Submit
        </button>
        {employee.employeeId !== 0 && (
          <button onClick={resetForm}>Cancel</button>
        )}
      </div>
      {employeeList?.map((d: IEmployeeList, index: number) => {
        return (
          <div key={index}>
            <div>{d.name}</div>
            <button onClick={() => selectEmployee(d)}>Edit</button>
            <button onClick={() => removeEmployee(d.employeeId)}>Delete</button>
          </div>
        );
      })}
    </>
  );
};
