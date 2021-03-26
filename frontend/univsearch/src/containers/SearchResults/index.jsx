import React from 'react';
import UnivCard from '../../components/UnivCard';
import SearchPagination from "../../components/SearchPagination";
import { useState } from 'react';

export default function SearchResults(props) {
  console.log({props});
  const {
    data = [],
    pageNumber, 
    totalCount, 
    disablePagination, 
    visible=true, 
    handlePageChange
  }= props;

  const defaultImage = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f";

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
                key={d._id}
                description={d.description}
                image={d.image !== ""? d.image: defaultImage}
                webPage={d.web_page}
              />
            );
          })}
          <SearchPagination 
            pageNumber={pageNumber} 
            totalCount={totalCount} 
            disable={disablePagination}
            handlePageChange={handlePageChange}
            visible={visible}
          />
        </div>
      }
    </>
  );
}