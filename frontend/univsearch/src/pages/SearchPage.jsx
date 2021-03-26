import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';

import SearchArea from '../containers/SearchArea';
import SearchResults from '../containers/SearchResults'
import { useEffect } from 'react';
import axios from 'axios';
const env = process.env;

export default function SearchPage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryCodesList, setcountryCodesLists] = useState([]);

  const [domain, setDomain] = useState("");
  const [domainList, setDomainList] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(10);
  const [disablePagination, setDisablePagination] = useState(true);
  const [isResultVisible, setResultsVisible] = useState(true);


  // Initial Mounting
  useEffect(()=> {
    // Fetching API for Select dropdown values Values

    const fetchCountryCodes = async () => {
      const countryCodesResults = await axios.get(`${env.REACT_APP_BACKEND_URL}/countrycodes`);
      setcountryCodesLists(countryCodesResults.data.data)
    };

    const fetchdomains = async () => {
      const results = await axios.get(`${env.REACT_APP_BACKEND_URL}/domains`);
      setDomainList(results.data.data)
    };

    fetchCountryCodes();
    fetchdomains();
  }, []);
  
  // Whenever Search Term Changes we update values here
  useEffect(()=>{
    // Update Search Results
    // Update Pagination
    console.log(searchTerm, countryCode, domain);
    
    if (searchTerm === "" && countryCode === "" && domain ==="") {
      const fetchResults = async () => {
        const univResults = await axios.get(`${env.REACT_APP_BACKEND_URL}/universities`);
        console.log(univResults.data.data);
        setSearchResults(univResults.data.data)
        setPageNumber(univResults.data.page +1);
        setTotalCount(Math.ceil(univResults.data.totalCount / univResults.data.limit));
      };
      fetchResults();
    } else {
      const fetchSearchResults = async () => {
        const univResults = await (await axios.get(`${env.REACT_APP_BACKEND_URL}/universities?searchTerm=${searchTerm}&alpha_two_code=${countryCode}&domain=${domain}&page=${pageNumber-1}`));
        setSearchResults(univResults.data.data)
      };
      fetchSearchResults();
    }

  }, [searchTerm, countryCode, domain, pageNumber]);


  
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
        countryCodes = {countryCodesList}
        domains = {domainList}
        handleSearch={handleSerchTermChange}
        searchTerm={searchTerm}
        domain={domain}
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