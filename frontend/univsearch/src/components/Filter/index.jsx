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
    id="filter"
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
      value="Please Select"
      onChange={handleFilterChange}
      helperText={helperText}
      variant="outlined"
      disabled={menuItems.length === 0}
    >
      {menuItems.map((menu) => <MenuItem value={menu}>{menu}</MenuItem> )}
    </TextField>
  );
}