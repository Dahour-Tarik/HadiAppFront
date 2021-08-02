import React, { useState } from "react";
import useForm from "./useForm";
import validate from "./validateLogin";
import "./login.css";

const Form = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );

  function submit() {
    console.log("Submitted Succesfully");
  }

  return (
    <div className="container">
      <div className="app-wrapper">
          <div>
              <h2 className="title"> Login </h2>
          </div>
      <form className="form-wrapper" onSubmit={handleSubmit} noValidate>
        <div className="name">
          <label className="label">Username</label>
            <input
              className="input"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div  className="password">
          <label className="label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button className="submit" type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

// form
// label / input for email
// label / input for password
// signup button

// handle changes
// handle submit

// custom react hook

// handle errors
// show errors if there are errors

export default Form;