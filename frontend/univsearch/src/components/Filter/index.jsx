import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function Filter(props) {
  const {
    label = "Select",
    defaultValue = "None",
    menuItems = [],
    handleFilterChange = () => {},
    helperText="Please Select",
    id="filter",
    value
  } = props;

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();
  
  return ( 
    <TextField
      id={id}
      select
      label={label}
      value={value}
      onChange={handleFilterChange}
      helperText={helperText}
      variant="outlined"
      disabled={menuItems.length === 0}
    >
      {menuItems.map((menu) => <MenuItem key={menu} value={menu}>{menu}</MenuItem> )}
    </TextField>
  );
}