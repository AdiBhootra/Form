import React, { useState } from "react";
import "./formPage.css";
import Validation from "./Validation";
import { Istate } from "../../modal/State";
import { useDispatch, useSelector } from "react-redux";
import { usersAction } from "../../feature/UserSlice";

const FormPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.user.users);

  const [errors, setErrors] = useState<Istate>({});
  const [inputs, setInputs] = useState<Istate>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  let formIsValid = false;
  if (
    inputs.name?.length !== 0 &&
    inputs.username?.length !== 0 &&
    inputs.email?.length !== 0 &&
    inputs.phone?.length !== 0 &&
    inputs.website?.length !== 0
  ) {
    formIsValid = true;
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let error = Validation(inputs);
    if (isValid(error)) {
      dispatch(
        usersAction.addUser({
          id: users.length + 1,
          name: inputs.name,
          username: inputs.username,
          email: inputs.email,
          phone: inputs.phone,
          website: inputs.website,
        })
      );
      resetInputs();
      resetErrors();
    } else {
      setErrors(error);
    }
  };

  const isValid = (error: any) => {
    const count = Object.keys(error).length === 0;
    return count;
  };

  const resetInputs = () => {
    setInputs({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };
  const resetErrors = () => {
    setErrors({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });
  };

  const blurHandler = (e:any) =>{
    console.log(e);

  }

  return (
    <div>
      
      <div className="form-control">
      <h2>Registration Form</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            name="name"
            value={inputs.name}
            placeholder="Name"
            onBlur={blurHandler}
          />
          {errors.name ? <p>{errors.name}</p> : ""}

          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            name="username"
            value={inputs.username}
            placeholder="username"
            onBlur={blurHandler}
          />

          {errors.username ? <p>{errors.username}</p> : ""}

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            name="email"
            value={inputs.email}
            placeholder="email"
            onBlur={blurHandler}
          />
          {errors.email ? <p>{errors.email}</p> : ""}

          <label htmlFor="phone">phone Number</label>
          <input
            type="text"
            id="phone"
            onChange={handleChange}
            name="phone"
            value={inputs.phone}
            placeholder="phonenum"
          />
          {errors.phone ? <p>{errors.phone}</p> : ""}

          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            onChange={handleChange}
            name="website"
            value={inputs.website}
            placeholder="website"
          />
          {errors.website ? <p>{errors.website}</p> : ""}
          <button type="submit" disabled={!formIsValid}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
