import React from 'react';
import UnivCard from '../../components/UnivCard';
import SearchPagination from "../../components/SearchPagination";
import { useState } from 'react';

export default function SearchResults(props) {
  const {
    data = [{
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    },
    {
      "alpha_two_code": "US",
      "country": "United States",
      "domain": "acu.edu",
      "name": "Abilene Christian University",
      "web_page": "http://www.acu.edu/"
    }],
    pageNumber, 
    totalCount, 
    disable, 
    visible=true, 
    handlePageChange
  }= props;

  const styles = {
    "display": "flex",
    "justifyContent": "space-around",
    "flexFlow": "row wrap",
    "alignItems": "stretch"
  }

  return (
    <> 
      {visible && 
        <div style={styles}>
          {data.map((d) => {
            return (
              <UnivCard
                title={d.name}
                description={d.description}
                image={d.image}
                webPage={d.web_page}
              />
            );
          })}
          <SearchPagination 
            pageNumber={pageNumber} 
            totalCount={totalCount} 
            disable={disable}
            handlePageChange={handlePageChange}
            visible={visible}
          />
        </div>
      }
    </>
  );
}