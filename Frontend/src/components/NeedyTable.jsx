/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
// NeedyTable.jsx

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
// import Modal from "react-modal";
import styles from "./NeedyTable.module.css";


const customStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      fontSize: '14px',
      background: 'rgb(20, 33, 61.5)',
      opacity: '0.85',
      color:'rgb(252, 163, 17)'
    },
  },
  pagination: {
    style: {
      background: '#f2f2f2',
    },
  },
  rows: {
    style: {
      backgroundColor: '#ffffff', // Set the background color for all rows
      minHeight: '50px', // Set the minimum height for each row
      marginBottom: '10px', // Set the bottom margin to create a gap between rows
    },
  },
  
};




const NeedyTable = ({data,addNeedyHandler ,onApprove}) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  

  useEffect(() => {
    const newData = data.filter(row => row.fullName.toLowerCase().includes(search.toLowerCase()));
    setFilteredData(newData);
  }, [search, data]);

  const handleFilter = (event) => {
    setSearch(event.target.value);
  };

  // 
  
const columns = [
  {
    name: 'Receiver ID',
    selector: row => row.receiverID,
    sortable: true,
  },
  {
    name: 'Full Name',
    selector: row => row.fullName,
    sortable: true,
  },
  {
    name: 'Phone Numbers',
    selector: row => row.phoneNumbers,
    // Cell: (value) => value.join(', '),
  },
  {
    name: 'Address',
    selector: row => row.address,
  },
  {
    name: 'Aadhaar Card Number',
    selector: row => row.aadhaarCardNumber,
  },
  {
    name: 'Registration Date',
    selector: row => row.registrationDate,
  },
  {
    cell:(row) => <button onClick={() => onApprove(row)}  id={row.ID}>Approve</button>
  },
];




  return (
    <>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          placeholder="Search..."
          type="text"
          value={search}
          onChange={handleFilter}
        />
      </div>
      <div className={styles.needyTable}>
        <DataTable
          data={filteredData}
          columns={columns}
          pagination
          fixedHeader
          
          // selectableRows
          // selectableRowsHighlight
          customStyles={customStyles}
        />
      </div>

    </>
  );
};

export default NeedyTable;
