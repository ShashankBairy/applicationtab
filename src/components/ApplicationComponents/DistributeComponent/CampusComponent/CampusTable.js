import React, { useState } from "react";
import TableWidget from "../../../../widgets/Table/TableWidget";
import CampusForm from "./CampusForm";

const sampleData = [
  {
    id: 1,
    applicationForm: "3001",
    applicationTo: "Department X",
    totalApplications: 150,
    amount: 5000,
    issuedName: "John Doe",
    campusName: "Campus 1",
    isSelected: false,
    academicYear: "2021",
    cityName: "Hitect City",
    zoneName: "Zone 1",
    issuedTo: "Person 1",
    applicationNoFrom: "3001",
    range: "1-10",
    applicationNoTo: "3010",
    issueDate: "2023-10-01",
    mobileNumber: "1234567890",
    campaignDistrict: "District 1",
    campaignAreaName: "Area 1",
    availableAppNoFrom: "3001",
    availableAppNoTo: "3010",
  },
  {
    id: 2,
    applicationForm: "3011",
    applicationTo: "Department Y",
    totalApplications: 200,
    amount: 7500,
    issuedName: "Jane Smith",
    campusName: "Campus 2",
    isSelected: false,
    academicYear: "2022",
    cityName: "Madhapur",
    zoneName: "Zone 2",
    issuedTo: "Person 2",
    applicationNoFrom: "3011",
    range: "11-20",
    applicationNoTo: "3030",
    issueDate: "2023-11-01",
    mobileNumber: "0987654321",
    campaignDistrict: "District 2",
    campaignAreaName: "Area 2",
    availableAppNoFrom: "3011",
    availableAppNoTo: "3030",
  },
  {
    id: 3,
    applicationForm: "3031",
    applicationTo: "Department Z",
    totalApplications: 100,
    amount: 3000,
    issuedName: "Alice Brown",
    campusName: "Campus 1",
    isSelected: false,
    academicYear: "2021",
    cityName: "Hitect City",
    zoneName: "Zone 1",
    issuedTo: "Person 1",
    applicationNoFrom: "3031",
    range: "21-30",
    applicationNoTo: "3060",
    issueDate: "2023-12-01",
    mobileNumber: "1122334455",
    campaignDistrict: "District 1",
    campaignAreaName: "Area 1",
    availableAppNoFrom: "3031",
    availableAppNoTo: "3060",
  },
];

const fieldMapping = {
  applicationForm: "applicationNoFrom",
  issuedName: "issuedTo",
  campusName: "campusName",
  academicYear: "academicYear",
  cityName: "cityName",
  zoneName: "zoneName",
  range: "range",
  applicationNoTo: "applicationNoTo",
  issueDate: "issueDate",
  mobileNumber: "mobileNumber",
  campaignDistrict: "campaignDistrict",
  campaignAreaName: "campaignAreaName",
  availableAppNoFrom: "availableAppNoFrom",
  availableAppNoTo: "availableAppNoTo",
};

const CampusTable = () => {
  const columns = [
    {
      accessorKey: "applicationForm",
      header: "Application Form",
      cell: ({ row }) => row.original.applicationForm,
    },
    {
      accessorKey: "applicationTo",
      header: "Application To",
      cell: ({ row }) => row.original.applicationTo,
    },
    {
      accessorKey: "totalApplications",
      header: "Total Applications",
      cell: ({ row }) => row.original.totalApplications,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `$${row.original.amount.toLocaleString()}`,
    },
    {
      accessorKey: "issuedName",
      header: "Issued Name",
      cell: ({ row }) => row.original.issuedName,
    },
    {
      accessorKey: "campusName",
      header: "Campus Name",
      cell: ({ row }) => row.original.campusName,
    },
  ];

  const [data, setData] = useState(sampleData);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const totalData = data.length;

  const handleSelectRow = (rowData, checked) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === rowData.id ? { ...item, isSelected: checked } : item
      )
    );
  };

  const handleUpdate = (updatedRow) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedRow.id
          ? {
              ...item,
              applicationForm: updatedRow.applicationNoFrom || item.applicationForm,
              issuedName: updatedRow.issuedTo || item.issuedName,
              campusName: updatedRow.campusName || item.campusName,
              academicYear: updatedRow.academicYear || item.academicYear,
              cityName: updatedRow.cityName || item.cityName,
              zoneName: updatedRow.zoneName || item.zoneName,
              range: updatedRow.range || item.range,
              applicationNoTo: updatedRow.applicationNoTo || item.applicationNoTo,
              issueDate: updatedRow.issueDate || item.issueDate,
              mobileNumber: updatedRow.mobileNumber || item.mobileNumber,
              campaignDistrict: updatedRow.campaignDistrict || item.campaignDistrict,
              campaignAreaName: updatedRow.campaignAreaName || item.campaignAreaName,
              availableAppNoFrom: updatedRow.availableAppNoFrom || item.availableAppNoFrom,
              availableAppNoTo: updatedRow.availableAppNoTo || item.availableAppNoTo,
            }
          : item
      )
    );
  };

  return (
    <TableWidget
      columns={columns}
      data={data}
      onUpdate={handleUpdate}
      onSelectRow={handleSelectRow}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      pageSize={pageSize}
      totalData={totalData}
      fieldMapping={fieldMapping}
      formComponent={CampusForm}
    />
  );
};

export default CampusTable;
