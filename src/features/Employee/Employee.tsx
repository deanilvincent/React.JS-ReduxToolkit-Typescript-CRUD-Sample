import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IEmployee, IEmployeeList } from "../../models/employee";
import { RootState, useAppDispatch } from "../../store";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./employeeApi";
import moment from "moment";
import { Input, Checkbox, Button } from "../../components";
import { toast, ToastContainer } from "react-toastify";

export const Employee: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const employeeList = useSelector(
    (state: RootState) => state.employee.list.values
  );
  const isLoadingTable = useSelector(
    (state: RootState) => state.employee.list.isLoading
  );
  const isSaving = useSelector(
    (state: RootState) => state.employee.save.isSaving
  );
  const isDeleting = useSelector(
    (state: RootState) => state.employee.save.isDeleting
  );

  const [employee, setEmployee] = useState<IEmployee>({
    employeeId: 0,
    name: "",
    birthday: moment(new Date()).format("YYYY-MM-DD"),
    isActive: false,
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const selectEmployee = (d: IEmployee) => {
    setShowValidation(false);
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
        .unwrap()
        .then((response) => {
          toast.success(response);
          dispatch(getEmployees());
        })
        .catch((error) => {
          toast.error(error);
        });
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (employee.name === "") {
      setShowValidation(true);
      return;
    }

    const action =
      employee.employeeId === 0
        ? addEmployee(employee)
        : updateEmployee(employee);

    dispatch(action)
      .unwrap()
      .then((response) => {
        toast.success(response);
        resetForm();
        dispatch(getEmployees());
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const resetForm = () => {
    setEmployee({
      employeeId: 0,
      name: "",
      isActive: false,
      birthday: moment(new Date()).format("YYYY-MM-DD"),
    });
    setShowValidation(false);
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title">
          Employee &nbsp;
          <span className="tag is-link">{employeeList?.length}</span>
        </h1>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  <Checkbox
                    title="Active"
                    name="isActive"
                    value={employee.isActive}
                    inputChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <Input
                    type="text"
                    title="Name"
                    name="name"
                    placeholder="Enter name here"
                    value={employee.name}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>
                <div className="column is-4">
                  <Input
                    type="date"
                    title="Birthday"
                    name="birthday"
                    value={employee.birthday}
                    inputChange={handleInputChange}
                  />
                </div>
              </div>
              <Button
                type="is-success"
                loading={isSaving}
                title="Submit"
                onClick={submit}
                disabled={isSaving || isDeleting}
              />
              &nbsp;
              {employee.employeeId !== 0 && (
                <Button
                  title="Cancel"
                  onClick={resetForm}
                  disabled={isSaving || isDeleting}
                />
              )}
              <hr />
              {isLoadingTable && (
                <div className="has-text-centered">Fetching...</div>
              )}
              <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Active</th>
                      <th>Birthday</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList?.map((d: IEmployeeList, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{d.name}</td>
                          <td>{d.isActive ? "Active" : "Inactive"}</td>
                          <td>{moment(d.birthday).format("MM/DD/YYYY")}</td>
                          <td>
                            <Button
                              type="is-warning"
                              title="Edit"
                              onClick={() => selectEmployee(d)}
                              disabled={isSaving || isDeleting}
                            />
                            &nbsp;
                            <Button
                              type="is-danger"
                              title="Delete"
                              loading={isDeleting}
                              onClick={() => removeEmployee(d.employeeId)}
                              disabled={isSaving || isDeleting}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer closeOnClick={true} />
      </div>
    </>
  );
};
