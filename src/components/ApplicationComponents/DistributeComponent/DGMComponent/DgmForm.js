import React from "react";
import DistributeForm from "../DistributeForm";

const DgmForm = ({ initialValues, onSubmit,setIsInsertClicked }) => {
  return (
    <DistributeForm
      formType="DGM"
      initialValues={initialValues}
      onSubmit={onSubmit}
      setIsInsertClicked={setIsInsertClicked}
    />
  );
};

export default DgmForm;