import React from "react";
import classes from "../../styles/Form.moduel.css";
const Form = ({ children, className, ...rest }) => {
  return (
    <form className={`${className} ${classes.form}`} {...rest}>
      {children}
    </form>
  );
};

export default Form;
