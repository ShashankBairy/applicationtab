import React from "react";
import styles from "./Button.module.css";

const Button = ({ buttonname, righticon, lefticon, onClick, type, disabled }) => {
  return (
    <div className={styles.button_wrapper}>
      <button 
        onClick={onClick} 
        type={type} 
        disabled={disabled}
        className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      >
        {righticon && <span className={styles.righticon}>{righticon}</span>}
        {buttonname}
        {lefticon && <span className={styles.lefticon}>{lefticon}</span>} 
      </button>
    </div>
  );
};

export default Button;