import React from 'react';
import styles from "../../styles/Pagination.module.css"

// https://github.com/bradtraversy/simple_react_pagination
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pages}>
      {pageNumbers.map(number => (
        <button key={`page-${number}`} className={styles.button} onClick={() => paginate(number)}>
          {number}</button>
      ))}
    </div>
  );
};

export default Pagination;