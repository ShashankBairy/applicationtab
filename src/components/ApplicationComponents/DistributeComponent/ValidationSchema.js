import * as Yup from "yup";

// Create a function that returns the validation schema with context
const createValidationSchema = (formType) => {
  return Yup.object({
    academicYear: Yup.string().required("Academic Year is required"),
    cityName: Yup.string().required("City Name is required"),
    zoneName: Yup.string().required("Zone Name is required"),
    issuedTo: Yup.string().required("Issued To is required"),
    applicationNoFrom: Yup.string()
      .required("Application No From is required")
      .matches(/^\d+$/, "Application No From must be a number"),
    range: Yup.string().required("Range is required"),
    issueDate: Yup.date().required("Issue Date is required"),

    // Zone-specific validation
    stateName: formType === "Zone" 
      ? Yup.string().required("State Name is required")
      : Yup.string().notRequired(),

    // DGM-specific validation
    campusName: formType === "DGM" 
      ? Yup.string().required("Campus Name is required")
      : Yup.string().notRequired(),

    // Campus-specific validation
    campaignDistrict: formType === "Campus" 
      ? Yup.string().required("Campaign District is required")
      : Yup.string().notRequired(),

    campaignAreaName: formType === "Campus" 
      ? Yup.string().required("Campaign Area Name is required")
      : Yup.string().notRequired(),
  });
};

export default createValidationSchema;