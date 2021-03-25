import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

export default function SearchPagination(props) {
  const {pageNumber=1, totalCount=10, disable=false, visible= false, handlePageChange}= props

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();

  const handlePaginationChange = (e) => {
    handlePageChange(e);
  }
  
  return ( 
    <>
      {visible && 
        <div className={classes.root}>
          <Pagination count={totalCount} page={pageNumber} color="secondary"  disabled={disable} onChange={handlePaginationChange}/>
        </div>
      }
    </>
  );
}