import React from 'react';

import Typography from '@material-ui/core/Typography';

import SearchArea from '../containers/SearchArea';
import SearchResults from '../containers/SearchResults'


export default function SearchPage() {

  return (
    <div>
      <Typography gutterBottom align="left" variant="h5" component="h2">
        Search Page
      </Typography>
      <SearchArea/>
      <Typography gutterBottom align="left" variant="body2" component="h2">
        Search Results
      </Typography>
      <SearchResults />
    </div>
  );
}