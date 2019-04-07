import React from 'react';

const SearchBar = ({ searchForUser, searchQuery, updateQuery }) => {
  return (
    <form className="mt-2" onSubmit={searchForUser}>
      <input placeholder="Enter Github Username" value={searchQuery} onChange={updateQuery} type="text" className="form-control text-center" />
    </form>
  )
}

export default SearchBar;
