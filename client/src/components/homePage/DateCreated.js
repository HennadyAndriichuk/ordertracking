import React from 'react';

const DateCreated = ({ date }) => {

  const displayDate = date ? new Date(date) : null;
  
  return (
    <div>
      {displayDate 
          ? `${displayDate.getDate()}-${displayDate.getMonth() + 1}-${displayDate.getFullYear()}`
          : ''}
    </div>
  );
};

export default DateCreated;
