import { useEffect, useState } from "react";
import axios from 'axios';
import LeaderBoard from "./Leaderboard";
import { TournamentLeaderboard } from "./TournamentLeaderboard";


const TournamentData = () => {
    const [top10Data, setCountryData] = useState([]);
    const [sortedData2, setWorldData] = useState([]);
    const [allcountries,setContries] = useState([])
    
    let countries = []

    function SortByTime(time) {
        time.sort((a, b) => {
          if (a.duration === null && b.duration === null) {
            return 0; // No change in order if both durations are null
          }
          
          if (a.duration === null) {
            return 1; // Move "a" towards the end if its duration is null
          }
          
          if (b.duration === null) {
            return -1; // Move "b" towards the end if its duration is null
          }
      
          const [minutesA, secondsA] = a.duration.split(":").map(Number);
          const [minutesB, secondsB] = b.duration.split(":").map(Number);
      
          if (minutesA !== minutesB) {
            return minutesA - minutesB;
          }
      
          return secondsA - secondsB;
        });
      }










    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch country-wise data
                const countryResponse = await axios.get('https://distinct-gray-sawfish.cyclic.app/leaderboard/country');
                const sortedData = countryResponse.data.sort((a, b) => b.score - a.score);
                const top10Data = sortedData.slice(0, 10);
      
                setCountryData(top10Data);

                // const worldData = await axios.get('http://localhost:3000/getall');
                // const sortedData2 = worldData.data.sort((a, b) => b.score - a.score).slice(0,10);
                // setWorldData(sortedData2);
                // console.log(sortedData2);
               


                const getContries =await axios.get('https://distinct-gray-sawfish.cyclic.app/getcountries?month=8&year=2022')

              

                
            {getContries.data.map((item)=>{
                
                countries.push(item._id)
            })}
                 
                 setContries(countries)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



  

    
   return(
    <>

<TournamentLeaderboard SortByTime={SortByTime} countryData={top10Data} worldData={sortedData2} allcountries={allcountries} setCountryData={setCountryData} setWorldData={setWorldData}/>


    </>
   )
}


export default TournamentData;
