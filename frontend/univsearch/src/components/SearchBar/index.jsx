import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function SearchBar(props) {
  const {
    label = "Search",
    handleSearch = ()=>{},
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
    <TextField id="outlined-basic" label={label} variant="outlined" onChange={handleSearch}/>
  );
}