import React, { useState } from "react";
import TableWidget from "../../../../widgets/Table/TableWidget";
import ZoneForm from "./ZoneForm";

const sampleData = [
  {
    id: 1,
    applicationForm: "1001",
    applicationTo: "Department X",
    totalApplications: 150,
    amount: 5000,
    issuedName: "John Doe",
    zoneName: "Zone 1",
    isSelected: false,
    academicYear: "2021",
    cityName: "Hitect City",
    issuedTo: "Person 1",
    applicationNoFrom: "1001",
    range: "1-10",
    applicationNoTo: "1010",
    issueDate: "2023-10-01",
    mobileNumber: "1234567890",
    stateName: "Telangana",
  }
];

const fieldMapping = {
  applicationForm: "applicationNoFrom",
  issuedName: "issuedTo",
  zoneName: "zoneName",
  academicYear: "academicYear",
  cityName: "cityName",
  range: "range",
  applicationNoTo: "applicationNoTo",
  issueDate: "issueDate",
  mobileNumber: "mobileNumber",
  stateName: "stateName",
};

const ZoneTable = () => {
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
      accessorKey: "zoneName",
      header: "Zone Name",
      cell: ({ row }) => row.original.zoneName,
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
              zoneName: updatedRow.zoneName || item.zoneName,
              academicYear: updatedRow.academicYear || item.academicYear,
              cityName: updatedRow.cityName || item.cityName,
              range: updatedRow.range || item.range,
              applicationNoTo: updatedRow.applicationNoTo || item.applicationNoTo,
              issueDate: updatedRow.issueDate || item.issueDate,
              mobileNumber: updatedRow.mobileNumber || item.mobileNumber,
              stateName: updatedRow.stateName || item.stateName,
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
      formComponent={ZoneForm}
    />
  );
};

export default ZoneTable;
