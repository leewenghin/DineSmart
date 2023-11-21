import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom';

const TablePage = () => {
    const { tableqrid } = useParams(); // Assuming you have a route parameter for tableqrid
    const [isValidAccess, setIsValidAccess] = useState(false);
    console.log(tableqrid);

  useEffect(() => {
    // Fetch the list of valid table numbers or QR codes from the server
    const fetchValidTableNumbers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ordertables/');
        const tableData = await response.json();
        const validTableNumbers = tableData.map((table: { name: any; }) => table.name);

        // Check if the current tableqrid is in the list of valid table numbers
        setIsValidAccess(validTableNumbers.includes(tableqrid));
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchValidTableNumbers();
  }, [tableqrid]);

  if (!isValidAccess) {
    // Redirect to an error page or handle unauthorized access
    return (
      <div>
        <h1>Error: Unauthorized Access</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Table Page - {tableqrid}</h1>
      <QRCode value={`http://www.tezi.com/table/${tableqrid}`} />
    </div>
  );
};

export default TablePage;
