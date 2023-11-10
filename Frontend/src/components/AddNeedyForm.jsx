// import React from 'react'
import  { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styles from "./AddNeedyForm.module.css";

const AddNeedyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumbers: '',
    address: '',
    aadhaarCardNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: '',
      phoneNumbers: '',
      address: '',
      aadhaarCardNumber: '',
      userPhoto: '',
      gpsLatitude: '',
      gpsLongitude: '',
      aadhaarCardPhoto: '',
      rationCardPhoto: '',
      familyMemberCount: '',
      income: '',
      sourceOfIncome: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Numbers"
            variant="outlined"
            fullWidth
            name="phoneNumbers"
            value={formData.phoneNumbers}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Aadhaar Card Number"
            variant="outlined"
            fullWidth
            name="aadhaarCardNumber"
            value={formData.aadhaarCardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="User Photo"
            variant="outlined"
            fullWidth
            name="userPhoto"
            value={formData.userPhoto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="GPS Latitude"
            variant="outlined"
            fullWidth
            name="GPS Latitude"
            value={formData.gpsLatitude}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="GPS Longitude"
            variant="outlined"
            fullWidth
            name="gpsLongitude"
            value={formData.gpsLongitude}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Aadhaar Card Photo"
            variant="outlined"
            fullWidth
            name="aadhaarCardPhoto"
            value={formData.aadhaarCardPhoto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Ration Card Photo"
            variant="outlined"
            fullWidth
            name="rationCardPhoto"
            value={formData.rationCardPhoto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="family Member Count"
            variant="outlined"
            fullWidth
            name="familyMemberCount"
            value={formData.familyMemberCount}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="income"
            variant="outlined"
            fullWidth
            name="income"
            value={formData.income}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="source Of Income"
            variant="outlined"
            fullWidth
            name="sourceOfIncome"
            value={formData.sourceOfIncome}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button className={styles.addBtn}   variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNeedyForm;
