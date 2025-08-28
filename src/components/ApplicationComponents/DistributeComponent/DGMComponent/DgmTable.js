import React, { useState } from "react";
import TableWidget from "../../../../widgets/Table/TableWidget";
import DgmForm from "./DgmForm";

const sampleData = [
  {
    id: 1,
    applicationForm: "2001",
    applicationTo: "Department X",
    totalApplications: 150,
    amount: 5000,
    issuedName: "John Doe",
    dgmName: "DGM 1",
    isSelected: false,
    academicYear: "2021",
    cityName: "Hitect City",
    zoneName: "Zone 1",
    issuedTo: "Person 1",
    applicationNoFrom: "2001",
    range: "1-10",
    applicationNoTo: "2010",
    issueDate: "2023-10-01",
    mobileNumber: "1234567890",
    campusName: "Campus 1",
    availableAppNoFrom: "2001",
    availableAppNoTo: "2010",
  },
  {
    id: 2,
    applicationForm: "2011",
    applicationTo: "Department Y",
    totalApplications: 200,
    amount: 7500,
    issuedName: "Jane Smith",
    dgmName: "DGM 2",
    isSelected: false,
    academicYear: "2022",
    cityName: "Madhapur",
    zoneName: "Zone 2",
    issuedTo: "Person 2",
    applicationNoFrom: "2011",
    range: "11-20",
    applicationNoTo: "2030",
    issueDate: "2023-11-01",
    mobileNumber: "0987654321",
    campusName: "Campus 2",
    availableAppNoFrom: "2011",
    availableAppNoTo: "2030",
  },
  {
    id: 3,
    applicationForm: "2031",
    applicationTo: "Department Z",
    totalApplications: 100,
    amount: 3000,
    issuedName: "Alice Brown",
    dgmName: "DGM 3",
    isSelected: false,
    academicYear: "2021",
    cityName: "Hitect City",
    zoneName: "Zone 1",
    issuedTo: "Person 1",
    applicationNoFrom: "2031",
    range: "21-30",
    applicationNoTo: "2060",
    issueDate: "2023-12-01",
    mobileNumber: "1122334455",
    campusName: "Campus 1",
    availableAppNoFrom: "2031",
    availableAppNoTo: "2060",
  },
];

const fieldMapping = {
  applicationForm: "applicationNoFrom",
  issuedName: "issuedTo",
  dgmName: "campusName",
  academicYear: "academicYear",
  cityName: "cityName",
  zoneName: "zoneName",
  range: "range",
  applicationNoTo: "applicationNoTo",
  issueDate: "issueDate",
  mobileNumber: "mobileNumber",
  availableAppNoFrom: "availableAppNoFrom",
  availableAppNoTo: "availableAppNoTo",
};

const DgmTable = () => {
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
      accessorKey: "dgmName",
      header: "DGM Name",
      cell: ({ row }) => row.original.dgmName,
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
              dgmName: updatedRow.campusName || item.dgmName,
              academicYear: updatedRow.academicYear || item.academicYear,
              cityName: updatedRow.cityName || item.cityName,
              zoneName: updatedRow.zoneName || item.zoneName,
              range: updatedRow.range || item.range,
              applicationNoTo: updatedRow.applicationNoTo || item.applicationNoTo,
              issueDate: updatedRow.issueDate || item.issueDate,
              mobileNumber: updatedRow.mobileNumber || item.mobileNumber,
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
      formComponent={DgmForm}
    />
  );
};

export default DgmTable;
