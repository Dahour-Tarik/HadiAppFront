export default function validateLogin(values) {
    let errors = {};
    if (!values.name) {
        errors.name = "Username is required";
    } 
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password needs to be more than 10 characters";
    }
    return errors;
  }