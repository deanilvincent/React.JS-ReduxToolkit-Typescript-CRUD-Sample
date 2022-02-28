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
    setShowValidation(false)
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
          alert(response);
          dispatch(getEmployees());
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (employee.name === ""){
      setShowValidation(true)
      return
    };

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
    setShowValidation(false)
  };

  return (
    <>
      <div className="form-container">
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  <div className="control">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="isActive"
                        onChange={handleInputChange}
                        checked={employee.isActive}
                      />
                      &nbsp;
                      <span style={{ fontWeight: "bold", fontSize: "12px" }}>
                        Active
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-4">
                  <div className="field">
                    <label className="label is-small">Name</label>
                    <div className="control">
                      <input
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        value={employee.name}
                        className="input is-small"
                        placeholder="Enter name here"
                      />
                    </div>
                    {employee.name === "" && showValidation ? (
                      <span className="is-size-7 has-text-centered has-text-danger">
                        Name is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="column is-4">
                  <div className="field">
                    <label className="label is-small">Birthday</label>
                    <div className="control">
                      <input
                        type="date"
                        name="birthday"
                        onChange={handleInputChange}
                        value={employee.birthday}
                        className="input is-small"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={
                  isSaving
                    ? "button is-success is-loading"
                    : "button is-success"
                }
                onClick={submit}
                disabled={isSaving}
              >
                Submit
              </button>
              &nbsp;
              {employee.employeeId !== 0 && (
                <button className="button" onClick={resetForm}>
                  Cancel
                </button>
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
                            <button
                              className="button is-warning is-small"
                              onClick={() => selectEmployee(d)}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              className={
                                isDeleting
                                  ? "button is-danger is-loading is-small"
                                  : "button is-danger is-small"
                              }
                              onClick={() => removeEmployee(d.employeeId)}
                            >
                              Delete
                            </button>
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
      </div>
    </>
  );
};
