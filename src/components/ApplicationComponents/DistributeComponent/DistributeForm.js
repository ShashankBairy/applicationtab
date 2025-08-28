import React, { useEffect, useMemo } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import Dropdown from "../../../widgets/Dropdown/Dropdown";
import Inputbox from "../../../widgets/Inputbox/InputBox";
import Button from "../../../widgets/Button/Button";
import createValidationSchema  from "./ValidationSchema";
import styles from "./DistributeForm.module.css";
import rightarrow from "../../../assets/rightarrow";
import RangeInputBox from "../../../widgets/Range/RangeInputBox";

const commonFields = [
  { name: "academicYear", label: "Academic Year", options: ["2021", "2022"] },
  { name: "cityName", label: "City Name", options: ["Hitect City", "Madhapur"] },
  { name: "zoneName", label: "Zone Name", options: ["Zone 1", "Zone 2"] },
  { name: "issuedTo", label: "Issued To", options: ["Person 1", "Person 2"] },
  {
    name: "applicationNoFrom",
    label: "Application No From",
    type: "text",
    placeholder: "Enter Application no Form",
  },
  { name: "range", label: "Range", component: RangeInputBox },
  {
    name: "applicationNoTo",
    label: "Application No To",
    type: "text",
    disabled: true,
    placeholder: "Application No To",
  },
  { name: "issueDate", label: "Issue Date", type: "date" },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    type: "tel",
    disabled: true,
    placeholder: "Mobile Number",
  },
];

const zoneFields = [
  {
    name: "stateName",
    label: "State Name",
    options: ["Telangana", "Andhra Pradesh"],
  },
];

const dgmFields = [
  {
    name: "campusName",
    label: "Campus Name",
    options: ["Campus 1", "Campus 2"],
  },
  {
    name: "availableAppNoFrom",
    label: "Available Appno From",
    type: "text",
    disabled: true,
    placeholder: "Available Appno From",
  },
  {
    name: "availableAppNoTo",
    label: "Available Appno To",
    type: "text",
    disabled: true,
    placeholder: "Available Appno To",
  },
];

const campusFields = [
  {
    name: "campusName",
    label: "Campus Name",
    options: ["Campus 1", "Campus 2"],
  },
  {
    name: "campaignDistrict",
    label: "Campaign District",
    options: ["District 1", "District 2"],
  },
  {
    name: "campaignAreaName",
    label: "Campaign Area Name",
    options: ["Area 1", "Area 2"],
  },
  {
    name: "availableAppNoFrom",
    label: "Available Appno From",
    type: "text",
    disabled: true,
    placeholder: "Available Appno From",
  },
  {
    name: "availableAppNoTo",
    label: "Available Appno To",
    type: "text",
    disabled: true,
    placeholder: "Available Appno To",
  },
];

const fieldLayouts = {
  Zone: [
    { id: "row-1", fields: ["academicYear", "stateName"] },
    { id: "row-2", fields: ["cityName", "zoneName"] },
    { id: "row-3", fields: ["issuedTo", "applicationNoFrom"] },
    { id: "row-4", fields: ["range", "applicationNoTo"] },
    { id: "row-5", fields: ["issueDate", "mobileNumber"] },
  ],
  DGM: [
    { id: "row-1", fields: ["academicYear", "cityName"] },
    { id: "row-2", fields: ["zoneName", "campusName"] },
    { id: "row-3", fields: ["issuedTo", "availableAppNoFrom"] },
    { id: "row-4", fields: ["availableAppNoTo", "applicationNoFrom"] },
    { id: "row-5", fields: ["range", "applicationNoTo"] },
    { id: "row-6", fields: ["issueDate", "mobileNumber"] },
  ],
  Campus: [
    { id: "row-1", fields: ["academicYear", "cityName"] },
    { id: "row-2", fields: ["zoneName", "campusName"] },
    { id: "row-3", fields: ["campaignDistrict", "campaignAreaName"] },
    { id: "row-4", fields: ["issuedTo", "applicationNoFrom"] },
    { id: "row-5", fields: ["availableAppNoFrom", "availableAppNoTo"] },
    { id: "row-6", fields: ["range", "applicationNoTo"] },
    { id: "row-7", fields: ["issueDate", "mobileNumber"] },
  ],
};

const computeApplicationNoTo = (fromStr, rangeStr) => {
  if (!fromStr || !rangeStr) return "";
  const from = parseInt(fromStr, 10);
  const [rFrom, rTo] = rangeStr.split("-").map((n) => parseInt(n, 10));
  if (Number.isNaN(from) || Number.isNaN(rFrom) || Number.isNaN(rTo)) return "";
  return String(from + (rTo - rFrom));
};

const getFieldsForType = (formType) => {
  switch (formType) {
    case "Zone":
      return [...commonFields, ...zoneFields];
    case "DGM":
      return [...commonFields, ...dgmFields];
    case "Campus":
      return [...commonFields, ...campusFields];
    default:
      return commonFields;
  }
};

const buildInitialValues = (fields, initialValues = {}) => {
  return fields.reduce(
    (acc, f) => ({
      ...acc,
      [f.name]: initialValues[f.name] || "",
    }),
    {}
  );
};

const AutoCalcAppTo = () => {
  const { values, setFieldValue } = useFormikContext();
  useEffect(() => {
    const next = computeApplicationNoTo(values.applicationNoFrom, values.range);
    setFieldValue("applicationNoTo", next, false);
  }, [values.applicationNoFrom, values.range, setFieldValue]);
  return null;
};

const DistributeForm = ({
  formType = "Zone",
  onSubmit,
  initialValues = {},
  setIsInsertClicked,
}) => {

  console.log("formType:", formType);
  const fieldsForType = useMemo(() => getFieldsForType(formType), [formType]);
  const fieldMap = useMemo(() => {
    const m = {};
    fieldsForType.forEach((f) => (m[f.name] = f));
    return m;
  }, [fieldsForType]);
  const formInitialValues = useMemo(
    () => buildInitialValues(fieldsForType, initialValues),
    [fieldsForType, initialValues]
  );

  // Determine button label based on initialValues
  const isUpdate = Object.keys(initialValues).some(
    (key) => initialValues[key] && initialValues[key] !== ""
  );
  const buttonLabel = isUpdate ? "Update" : "Insert";

  const renderField = (name, values, setFieldValue, touched, errors) => {
    const cfg = fieldMap[name];
    if (!cfg) return null;
    const errorMessage = touched[name] && errors[name] ? errors[name] : null;

    if (cfg.name === "range") {
      return (
        <>
          <Field
            key={cfg.name}
            name={cfg.name}
            label={cfg.label}
            component={RangeInputBox}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </>
      );
    }
    if (Array.isArray(cfg.options)) {
      return (
        <>
          <Dropdown
            key={cfg.name}
            dropdownname={cfg.label}
            name={cfg.name}
            results={cfg.options}
            value={values[cfg.name]}
            onChange={(e) => setFieldValue(cfg.name, e.target.value)}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </>
      );
    }
    const isAppFrom = cfg.name === "applicationNoFrom";
    const handleChange = isAppFrom
      ? (e) => {
          const onlyDigits = e.target.value.replace(/\D/g, "");
          setFieldValue(cfg.name, onlyDigits);
        }
      : (e) => setFieldValue(cfg.name, e.target.value);
    const isText = (cfg.type || "text") === "text";
    const disabled = isText ? !isAppFrom : !!cfg.disabled;
    return (
      <>
        <Inputbox
          key={cfg.name}
          label={cfg.label}
          id={cfg.name}
          name={cfg.name}
          placeholder={cfg.placeholder || ""}
          type={cfg.type || "text"}
          value={values[cfg.name]}
          onChange={handleChange}
          disabled={disabled}
        />
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </>
    );
  };

  const validationSchema = useMemo(() => 
    createValidationSchema(formType), [formType]
  );

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      validationContext={{ formType }}
      onSubmit={(values) => {
        if (onSubmit) {
          onSubmit(values);
        } else {
          console.log("Submit:", values);
        }
        setIsInsertClicked(true);
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="distribute-form">
          <AutoCalcAppTo />
          <div className={styles.form_rows}>
            {fieldLayouts[formType].map((row) => (
              <div key={row.id} className={styles.field_row}>
                {row.fields.map((fname) => (
                  <div key={fname} className={styles.field_cell}>
                    {renderField(fname, values, setFieldValue, touched, errors)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.form_actions}>
            <Button
              type="submit"
              buttonname={buttonLabel}
              lefticon={rightarrow}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DistributeForm;