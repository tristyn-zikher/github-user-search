import React from 'react';
import TableItem from './TableItem'

const Table = ({ savedUsers, onClick }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th onClick={ ()=>{ onClick('login') } }>Username</th>
          <th onClick={ ()=>{ onClick('name') } }>Name</th>
          <th onClick={ ()=>{ onClick('public_repos') } } className="h-on-mobile">Public Repos</th>
          <th onClick={ ()=>{ onClick('public_gists') } } className="h-on-mobile">Public Gists</th>
          <th onClick={ ()=>{ onClick('followers') } } className="h-on-mobile">Followers</th>
          <th onClick={ ()=>{ onClick('following') } } className="h-on-mobile">Following</th>
          <th onClick={ ()=>{ onClick('created_at') } }>Created At</th>
        </tr>
      </thead>
      <tbody>
      {
        savedUsers &&
        savedUsers.map((user, index) => {
          return <TableItem key={index} user={user} index={index} />
        })
      }
      </tbody>
    </table>
  )
}

export default Table;
