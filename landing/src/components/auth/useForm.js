import { useState, useEffect } from "react";
import axios from 'axios';


const useForm = (callback, validate) => {
  const [values, setValues] = useState({ email: "", name: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    axios.post("http://localhost:28080/user", {username: values.name, password: values.password})
    .then((response) => {
       console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;