import DistributeForm from "../DistributeForm";

const ZoneForm = ({ initialValues, onSubmit,setIsInsertClicked }) => {
  return (
    <DistributeForm
      formType="Zone"
      initialValues={initialValues}
      onSubmit={onSubmit}
      setIsInsertClicked={setIsInsertClicked}
    />
  );
};

export default ZoneForm;