import React, { useState } from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import styles from "./PostNeedForm.module.css";

const PostNeedForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    quantity: '',
    deadline: '',
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
    // Handle form submission, e.g., submit to a server
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="education">Education</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="womenGirls">Women & Girls</MenuItem>
              <MenuItem value="animals">Animals</MenuItem>
              <MenuItem value="creative">creative</MenuItem>
              <MenuItem value="foodHunger">Food & Hunger</MenuItem>
              <MenuItem value="environmental">Environmental</MenuItem>
              <MenuItem value="children">Children</MenuItem>
              <MenuItem value="memorial">Memorial</MenuItem>
              <MenuItem value="communityDevelopment">Community Development</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            label="Deadline"
            type="date"
            variant="outlined"
            fullWidth
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          /> */}

          <FormControl fullWidth variant="outlined">
            <InputLabel id="deadline-label"></InputLabel>
            <TextField
              label="Deadline"
              type="date"
              variant="outlined"
              fullWidth
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button className={styles.addBtn}  variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostNeedForm;
