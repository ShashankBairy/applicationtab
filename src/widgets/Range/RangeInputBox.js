import React, { useState, useRef, useEffect } from "react";
import styles from "./RangeInputBox.module.css";
import updownicon from "../../assets/updownicon";

const RangeInputBox = ({ field, form, label }) => {
  const [rangeClicked, setRangeClicked] = useState(false);
  const rangeInputRef = useRef(null); // Reference for input box
  const rangeOptionsRef = useRef(null); // Reference for the options list

  // Range options array
  const rangeOptions = [
    { label: "1-10", value: "1-10" },
    { label: "11-20", value: "11-20" },
    { label: "21-30", value: "21-30" },
    { label: "31-40", value: "31-40" },
    { label: "41-50", value: "41-50" },
  ];

  const handleRangeClicked = () => {
    setRangeClicked(true);
  };

  const handleOptionClick = (value) => {
    form.setFieldValue(field.name, value); // Update form field value
    setRangeClicked(false); // Close dropdown after selection
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numbers (including empty string for backspace/delete)
    if (value === "" || /^[0-9]+$/.test(value)) {
      form.setFieldValue(field.name, value); // Update form field with valid input
    }
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        rangeInputRef.current &&
        !rangeInputRef.current.contains(event.target) &&
        rangeOptionsRef.current &&
        !rangeOptionsRef.current.contains(event.target)
      ) {
        setRangeClicked(false); // Close the dropdown if click is outside
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.range_box_wrapper}>
      <label className={styles.label_name} htmlFor={field.name}>
        {label}
      </label>
      <div className={styles.range_input_box} ref={rangeInputRef}>
        <input
          type="text"
          id={field.name}
          name={field.name}
          value={field.value || ""}
          onChange={handleInputChange}
          onClick={handleRangeClicked}
          className={styles.range_input}
          placeholder="Enter a number"
        />
        <span className={styles.range_input_icon}>{updownicon}</span>
      </div>

      {rangeClicked && (
        <ul className={styles.range_options} ref={rangeOptionsRef}>
          {rangeOptions.map((option) => (
            <li key={option.value} className={styles.range_option}>
              <a
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleOptionClick(option.value);
                }}
                className={styles.range_option_link}
              >
                {option.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RangeInputBox;
