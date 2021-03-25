import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';

import SearchArea from '../containers/SearchArea';
import SearchResults from '../containers/SearchResults'
import { useEffect } from 'react';


export default function SearchPage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [domain, setDomain] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [disablePagination, setDisablePagination] = useState(true);
  const [isResultVisible, setResultsVisible] = useState(false);


  // Initial Mounting
  useEffect(()=> {
    // Fetching API for Select dropdown values Values
  }, []);
  
  // Whenever Search Term Changes we update values here
  useEffect(()=>{
    // Update Search Results
    // Update Pagination
  }, [searchTerm, countryCode, domain]);


  
  const handleSerchTermChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const handleCountryCodeChange = (e) => {
    console.log(e.target.value);
    setCountryCode(e.target.value);
  };
  const handleDomainChange = (e) => {
    console.log(e.target.value);
    setDomain(e.target.value);
  };
  const handlePageChange = e => {
    console.log(e.target.textContent);
    setPageNumber(Number(e.target.textContent));
  };

  return (
    <div>
      <Typography gutterBottom align="left" variant="h5" component="h2">
        Search Page
      </Typography>
      <SearchArea 
        handleSearch={handleSerchTermChange}
        searchTerm={searchTerm}
        handleCountryCodeChange={handleCountryCodeChange}
        handleDomainChange={handleDomainChange}
      />
      <Typography gutterBottom align="left" variant="body2" component="h2">
        Search Results
      </Typography>
      <SearchResults 
        data={searchResults}
        pageNumber={pageNumber}
        totalCount={totalCount}
        disablePagination={disablePagination}
        visible={isResultVisible}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}