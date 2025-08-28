import React from "react";
import DistributeForm from "../DistributeForm";

const CampusForm = ({ initialValues, onSubmit,setIsInsertClicked }) => {
  return (
    <DistributeForm
      formType="Campus"
      initialValues={initialValues}
      onSubmit={onSubmit}
      setIsInsertClicked={setIsInsertClicked}
    />
  );
};

export default CampusForm;