import React from 'react';

const TableItem = ({ user, index }) => {
  var currentDate = new Date(user.created_at);
  var date = currentDate.getDate();
  var month = currentDate.getMonth() +1;
  var year = currentDate.getFullYear();
  var dateString = `${date}-${month}-${year}`;

  const onClick = () => {
    window.open(user.html_url);
  };

  return (
    <tr key={index}>
      <td className="text-primary" onClick={onClick} >{user.login}</td>
      <td className="text-dark">{user.name || 'Name Unavailable'}</td>
      <td className="text-dark h-on-mobile">{user.public_repos}</td>
      <td className="text-dark h-on-mobile">{user.public_gists}</td>
      <td className="text-dark h-on-mobile">{user.followers}</td>
      <td className="text-dark h-on-mobile">{user.following}</td>
      <td className="text-dark">{dateString}</td>
    </tr>
  )
}

export default TableItem;
