import React from 'react';

const TopPosition = ({ rank, username, country, score, bgColor }) => {
  return (
    <div className={`grid grid-cols-4 h-12 rounded-3xl mt-1 ${bgColor}`}>
      <div className="items-center text-center mt-1 text-white">{rank}</div>
      <div className="col-span-2 h-12 mt-1 text-white">
        <h3 className='font-bold text-xl -mt-2'>{username}</h3>
        <p className='text-sm -mt-1 #4ade80'>{country}</p>
      </div>
      <div>
        <h3 className="text-white font-bold mt-1">{score}</h3>
      </div>
    </div>
  );
};

export default TopPosition;
