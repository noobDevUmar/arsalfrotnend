import React, { useEffect, useState } from 'react';
import axios from 'axios';
import paint from './photos/paint.png';
import paint2 from './photos/paint2.jpg';
import crown from './photos/crown.png';
import globe from './photos/globe.png';
import orange from './photos/orange.png';
import one from './photos/1.png';
import two from './photos/two.png';
import three from './photos/three.png';
import four from './photos/four.png';
import five from './photos/five.png';
import six from './photos/six.png';
import seven from './photos/seven.png';
import eight from './photos/eight.png';
import nine from './photos/nine.png';
import ten from './photos/ten.png';
import BlackOne from './photos/black.png';
import FilterCounty from './Components/FilterCountryOptions';
import { Link } from "react-router-dom";
import CountryListing from './Components/CountryListing';
import UserListing from './Components/UserListing';
import TournamentCountryListing from './assets/TournamentComponents/CountryListing';
import TournamentTopListing from './assets/TournamentComponents/TournamentTopListing';
import { motion } from "framer-motion";
export const TournamentLeaderboard = ({ worldData, countryData, setCountryData, setWorldData, SortByTime }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [worldDataselected, setWorldDataselected] = useState(true);
  const [countryname, setCountryname] = useState('');
  const [showCountryList, setShowCountryList] = useState(true);
  const [countryselected, setCountrySelected] = useState(false);
  const [userData, setUserData] = useState('');
  const [showuserData, setShowUserData] = useState(false);
  const [currentWatching, setCurrentWatching] = useState('Global');
  const [allcountries, setContries] = useState([]);
  const [selectedmonth, setselectedMonth] = useState(currentMonth);
  const [selectedyear, setselectedYear] = useState(currentYear);
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("1");
  const [worldParticiapants, setWorldParticiapant] = useState(0);
  const [countryParticipants, setCountryParticiapant] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  let countries = [];

  const pics = [BlackOne, two, three, four, five, six, seven, eight, nine, ten];
  const colors = ['bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900', 'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900', 'bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500', 'bg-gradient-to-r from-emerald-500 to-lime-600', 'bg-gradient-to-r from-pink-700 to-purple-900', 'bg-gradient-to-l from-lime-400 to-lime-800', 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%', 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300', 'bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900', 'bg-gradient-to-l from-emerald-500 to-emerald-900'];

  useEffect(() => {
    if (selectedmonth && selectedyear) {
      renderCountries();
      Filtering();
      renderLevels();
    }
  
  }, [selectedmonth, selectedyear, worldDataselected, countryselected, countryname, selectedLevel]);

  async function renderCountries() {
    try {
      const getContries = await axios.get(`https://distinct-gray-sawfish.cyclic.app/search/tournament?month=${selectedmonth}&year=${selectedyear}&level=${selectedLevel}`);
      
      getContries.data.forEach((item) => {
        if (item._id !== 'Global') countries.push(item._id);
      });
      setContries(countries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }

  async function renderLevels() {
    try {
      const getLevels = await axios.get(`https://distinct-gray-sawfish.cyclic.app/gettournamentevels`);
      if (getLevels.data) setLevels(getLevels.data);
    } catch (error) {
      console.error('Error fetching levels:', error);
    }
  }

  async function Filtering() {
    if (currentWatching === 'Global') {
      try {
        const response = await axios.get(`https://distinct-gray-sawfish.cyclic.app/filter/tournament?year=${selectedyear}&month=${selectedmonth}&level=${selectedLevel}`);
        setWorldParticiapant(response.data.length);
        SortByTime(response.data);
        const sortedData = response.data?.sort((a, b) => b.score - a.score);
        const top10Data = sortedData.slice(0, 10);
        setWorldData(top10Data);
      } catch (error) {
        console.error('Error fetching global data:', error);
      }
    } else {
      try {
        const response = await axios.get(`https://distinct-gray-sawfish.cyclic.app/filter/tournament?year=${selectedyear}&month=${selectedmonth}&region=${countryname}&level=${selectedLevel}`);
        if (response.data) {
          setCountryParticiapant(response.data.length);
          SortByTime(response.data);
          const sortedData = response.data.sort((a, b) => b.score - a.score);
          const top10Data = sortedData.slice(0, 10);
          setCountryData(top10Data);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    }
  }

  const WorldtoBackend = async () => {
    setCurrentWatching('Global');
    setShowUserData(false);
    setCountrySelected(false);
    setShowCountryList(false);
    setWorldDataselected(true);
  }

  return (
    <>
      <div   className='flex '>
        <div className='buttons mt-40 text-left '>
          <FilterCounty selectedmonth={selectedmonth} setselectedMonth={setselectedMonth} selectedyear={selectedyear} setselectedYear={setselectedYear} />
          <div className='flex hover:bg-slate-500 hover:scale-105 bg-gray-100 bg-opacity-25 pr-5 rounded-tl-lg'>
            <img className='h-4 mt-2 mr-1' src={`${globe}`} />
            <button className='text-white font-bold text-xl' onClick={WorldtoBackend}>Global </button>
          </div>
          <div className='bg-gray-100 bg-opacity-25 pl-2 rounded-bl-xl flex flex-col gap-1'>
            {allcountries.map((country) => (
              <ul key={country}>
                <a className='font-semibold cursor-pointer text-white hover:text-yellow-400' onClick={() => {
                  setWorldDataselected(false);
                  setShowUserData(false);
                  setCountrySelected(true);
                  setCountryname(country);
                  setCurrentWatching(country);
                }}>
                  <div>{country}</div>
                </a>
              </ul>
            ))}
          </div>
        </div>

        <div className="bg-lime-700 bg-opacity-70 h-[98vh] items-end rounded-3xl bg-cover shadow-green-400 shadow-md z-10">
          <div className="grid grid-cols-4 w-[32rem]">
            <div className="object-contain col-start-1 items-center text-left rounded-2xl col-span-4 relative">
              <h2 className='text-4xl font-test text-center text-white pt-2 rounded-t-3xl relative'>Tournament </h2>
              <p className='absolute text-white right-12 top-5 font-bold'>     ({currentWatching})</p>
              <div className='via-purple-900 to-slate-900 items-center text-right'>

                <div className='flex justify-between -mt-10'>
                  <div className='mt-4'>
                    {/* <p className='text-white font-bold  text-left ml-2 -mb-1'> Level : {selectedLevel}</p> */}
                    <p className='text-white  font-bold mt-6 ml-1'>  {currentWatching === 'Global' ? worldParticiapants : countryParticipants} contestants in level {selectedLevel}</p>
                  </div>
                    {/* <p className='text-white  font-bold  mt-8'> Level : {selectedLevel}</p> */}
                  <div className='mt-5'>
                    {/* <p className='text-[#fcd34d] font-bold text-[13px]  '> Start At: 1/{selectedmonth}/{selectedyear} </p> */}
                    <p className='text-[#fcd34d] font-bold text-[13px] mt-5 '> Last Date : 28/{selectedmonth}/{selectedyear} </p>
                  </div>
                </div>

              </div>
            </div>
            <div className="bg-[#fff] font-poppins text-lg text-right pr-4 font-bold rounded-l-3xl ml-2">Rank</div>
            <div className="col-span-2 ">
              <h2 className='bg-[#fff] text-left text-lg font-extrabold font-poppins pl-6 pl-2 ' >{showuserData ? "Date&time" : "Name"}</h2>
            </div>
            <div className="bg-[#fff] font-bold text-lg text-left font-poppins rounded-r-3xl mr-2">Scores</div>
          </div>

                        {/* --------------------------------- RECORDS -----------------------------*/}

          {worldDataselected && <>
          {/* No record Handling*/}
          {worldData.length===0&&
          <div className='text-white  font-poppins pt-48 ' >
                <h3>Sorry , NO RECORDS FOUND! </h3> 
                <p className='text-[10px]'> Please select other records</p>
                </div> }


            {worldData.map((item, index) => (
                <React.Fragment key={item.rank}>
                 
                  
                <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 2 }} 
       className={`grid grid-cols-4 ${colors[index]} bg-opacity-40 shadow-sm shadow-yellow-600 bg-opacity-80 mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit `}>
                <div className="text-center text-white ">
                <img className="h-64 w-44 -mt-20 -ml-12 origin-bottom w-16 mb absolute " src={pics[index]} />
                </div>
                <div className="col-span-2 h-12 mt-2 text-white" >
                
           
                <h3 className='text-left -ml-4 -mt-2 font-poppins' >{item.username}</h3>
                <p className='text-[11px] text-left -mt-1 -ml-2 #4ade80 '>{item.usercountry}</p>
                  
              
                </div>
                <TournamentTopListing item={item} />
                </motion.div>
                </React.Fragment>
               
            ))}
          </>}
          {countryselected && <>
          {/* No record handling */}
            {countryData.length===0&&
          <div className='text-white  font-poppins pt-48 '>
                <h3>Sorry , NO RECORDS FOUND! </h3> 
                <p className='text-[10px]'> Please select other records</p>
                </div> }
            {countryData.map((item, index) => (
              <React.Fragment key={item.rank}>
                <div className={`grid grid-cols-4 ${colors[index]} bg-opacity-40 shadow-sm shadow-yellow-600 bg-opacity-80 mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit `}>
                  <div className="text-center text-white ">
                    <img className="h-64 w-48 -mt-20 -ml-12 origin-bottom w-16 mb absolute " src={pics[index]} />
                  </div>
                  <div className="col-span-2 h-12 mt-2 text-white">                
                  <h3 className='text-left -ml-4 -mt-1 font-poppins'>{item.username}</h3>
                  </div>
                  <TournamentCountryListing item={item} />
                </div>
              </React.Fragment>
            ))}
          </>}
        </div>
        {/* third part */}
        <div className='buttons mt-40 text-left '>
          <div className='bg-gray-100 bg-opacity-25 pl-2 rounded-br-xl flex flex-col gap-1 pr-2 py-1'>
            {levels.map((level) => (
              <ul key={level}>
                <a className='font-semibold cursor-pointer text-white hover:text-yellow-400' onClick={() => { setSelectedLevel(level) }}>
                  <div> Level {level} </div>
                </a>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
