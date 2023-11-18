import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import styles from "./DoneeDataTable.module.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";
import { BACKEND_URL } from "../../utils/constants";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LaunchIcon from "@mui/icons-material/Launch";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddDoneeDialog from "./AddDoneeDialog";
import { Dialog } from "@mui/material";

const DoneeDataTable = () => {
  const [donees, setDonees] = useState([]);
  const [addDoneeDialogOpen, setAddDoneeDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchDonees = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/ngo/getDonees`, {
        mode: "cors",
        withCredentials: true,
      });

      //   console.log(response.data);

      const resultMapArray = response.data.map((item) => {
        const result = {
          id: item._id,
          onBoardedBy: item.onBoardedBy,
          fullName: item.fullName,
          photoUrl: item.photoUrl,
          phoneNumber1: item.phoneNumbers[0] ? item.phoneNumbers[0] : "-",
          address: item.address,
          phoneVerified: item.verificationStatus.phone ? "✔️" : "❌",
          aadhaarCardVerified: item.verificationStatus.aadhaarCard
            ? "✔️"
            : "❌",

          registeredOn: moment(item.registeredOn).format("MMM Do YYYY, h:mm a"),
        };

        return result;
      });

      setDonees(resultMapArray);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDonees();
    setRefresh(false);
    console.log("useEffect Called");
  }, [refresh]);

  const [globalFilter, setGlobalFilter] = useState("");

  const onInputChange = (e) => {
    if (!e.target.value) {
      setGlobalFilter("");
    }
    setGlobalFilter(e.target.value);
  };

  const filterData = (value, filter) => {
    return (
      filter === undefined ||
      filter === null ||
      String(value).toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  const doneeImageTemplate = (rowData) => {
    return (
      <img
        src={rowData.photoUrl}
        alt={rowData.name}
        style={{
          width: "100%",
          maxWidth: "50px",
          height: "50px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    );
  };

  const addNeedTemplate = (rowData) => {
    return (
      <>
        <div className={styles.addIcon}>
          <AddCircleIcon />
        </div>
      </>
    );
  };

  const viewMoreTemplate = (rowData) => {
    return (
      <>
        <div className={styles.viewMore}>
          <LaunchIcon />
        </div>
      </>
    );
  };

  const addDonee = async () => {
    setAddDoneeDialogOpen(true);
  };

  const handleAddDoneeDialogClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setRefresh(true);
      setAddDoneeDialogOpen(false);
    }
  };

  return (
    <>
      <AddDoneeDialog
        open={addDoneeDialogOpen}
        setOpen={setAddDoneeDialogOpen}
        onClose={handleAddDoneeDialogClose}
      />

      <div className={styles.dataTableContainer}>
        <div className={styles.row}>
          <div className={styles.globalFilterContainer}>
            <InputText
              placeholder="Search"
              onChange={onInputChange}
              value={globalFilter}
              className={styles.globalFilter}
            />
          </div>

          <div>
            {" "}
            <Button
              onClick={addDonee}
              variant="contained"
              startIcon={<PersonAddAlt1Icon />}
              className={styles.addDoneeButton}
              style={{
                padding: "10px 25px",
                width: "max-content",
                // background: "#80b918",
                background: "var(--color2)",
                color: "var(--color1)",
              }}
            >
              Add Donee
            </Button>
          </div>
        </div>

        <DataTable
          value={donees}
          globalFilter={globalFilter}
          tableStyle={{ minWidth: "50vw" }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className={styles.dataTable}
        >
          <Column
            field="photoUrl"
            header="Photo"
            align="center"
            body={doneeImageTemplate}
          ></Column>
          <Column
            field="fullName"
            header="Full Name"
            align="center"
            sortable
          ></Column>
          <Column
            field="phoneNumber1"
            header="Phone Number"
            align="center"
            sortable
          ></Column>
          <Column
            field="address"
            header="Address"
            align="center"
            sortable
          ></Column>
          <Column
            field="phoneVerified"
            header="Phone Verified"
            align="center"
            sortable
            // style={{ width: "10%" }}
          ></Column>
          <Column
            field="aadhaarCardVerified"
            header="Aadhaar Verified"
            align="center"
            sortable
          ></Column>
          <Column field="registeredOn" header="Registered On" sortable></Column>
          <Column
            filter={false}
            header="Add Need"
            align="center"
            body={addNeedTemplate}
          ></Column>
          <Column
            filter={false}
            header="View More"
            align="center"
            body={viewMoreTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
};

export default DoneeDataTable;
