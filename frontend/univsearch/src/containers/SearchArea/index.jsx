import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';

export default function SearchArea(props) {
  const {
    handleSearch,
    countryCodes = ["US", "IND"],
    domains = [".edu", ".us"]
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
    <div>
      <form className={classes.root} noValidate>
        <SearchBar label="Search Universities" handleSearch={handleSearch}/>
        <Filter label="Country Code" helperText="Select a Country Code" menuItems={countryCodes}/>
        <Filter label="Domain" helperText="Select a Domain" menuItems={domains}/>
      </form>
    </div>
  );
}