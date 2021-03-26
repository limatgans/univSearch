import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../../components/SearchBar';
import Filter from '../../components/Filter';

export default function SearchArea(props) {
  const {
    handleSearch,
    countryCodes = ["US", "IND"],
    domains = [".edu", ".us"],
    domain,
    countrycode,
    handleCountryCodeChange=()=>{},
    handleDomainChange=()=>{}
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
        <SearchBar 
          label="Search Universities"
          handleSearch={handleSearch}
        />
        <Filter 
          id = "countryCode"
          label="Country Code" 
          helperText="Select a Country Code" 
          menuItems={countryCodes}
          value={countrycode}
          handleFilterChange={handleCountryCodeChange}
        />
        <Filter
          id = "domain"
          label="Domain" 
          helperText="Select a Domain" 
          menuItems={domains}
          value={domain}
          handleFilterChange={handleDomainChange}
        />
      </form>
    </div>
  );
}