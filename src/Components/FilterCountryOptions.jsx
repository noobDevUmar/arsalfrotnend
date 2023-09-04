import axios from "axios";
import { useEffect, useState } from "react";


const FilterCounty = ({filterCounty,filterAll,selectedmonth,selectedyear,setselectedMonth,setselectedYear}) => {


  const handleChangeCountryMonth = (event) => {
    setselectedMonth(event.target.value);

    // filterCounty(event.target.value,selectYearCountry)
   
  };

  const handleChangeCountryYear = (event) => {
    setselectedYear(event.target.value);
    // filterCounty(selectmonthCountry,event.target.value)
  
 
  };

  async function fetchYear(){

  // const res =   await axios.get('http://localhost:3000/fetchyears')

  }


  useEffect(()=>{
fetchYear()


  },[])


  const monthOptions = [
    { label: "January", value: 1 },
    { label: "Febuary", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value:  10 },
    { label: "November", value: 11 },
    { label: "December", value:12 },



  ];

  const yearOptions = [
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
  ];





  
  return (
    <>
    <select value={selectedyear} onChange={handleChangeCountryYear} className="bg-gray-50 border border-gray-300 block w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {/* <select value={selectedyear} onChange={handleChangeCountryYear} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> */}
     
     {yearOptions.map((option) => (
       <option key={option.value} value={option.value}>
         {option.label}
       </option>
     ))}
   </select>
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedmonth} onChange={handleChangeCountryMonth}>
      {/* <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedmonth} onChange={handleChangeCountryMonth}> */}
       
        {monthOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
    </>
  );
};

export default FilterCounty;
