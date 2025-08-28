import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ name, errors, touched }) => {
  if (!errors[name] || !touched[name]) return null;

  return <div className={styles.error_text}>{errors[name]}</div>;
};

export default ErrorMessage;
