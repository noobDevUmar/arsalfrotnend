import React,{useEffect, useState} from 'react';
import './leaderboard.css'
import axios from 'axios';
import paint from './photos/paint.png'
import paint2 from './photos/paint2.jpg'
import crown from './photos/crown.png'
import globe from './photos/globe.png'
import orange from './photos/orange.png'
import one from './photos/1.png'
import two from './photos/two.png'
import three from './photos/three.png'
import four from './photos/four.png'
import five from './photos/five.png'
import six from './photos/six.png'
import seven from './photos/seven.png'
import eight from './photos/eight.png'
import nine from './photos/nine.png'
import ten from './photos/ten.png'
import FilterCounty from './Components/FilterCountryOptions';
import TopListing from './Components/TopListing';
import { Link } from "react-router-dom";
import CountryListing from './Components/CountryListing';
import UserListing from './Components/UserListing';



const Leaderboard = ({ worldData, countryData, setCountryData, setWorldData }) => {

  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
  const currentYear = new Date().getFullYear();

  const [worldDataselected, setWorldDataselected] = useState(true)
  const [countryname, setCountryname] = useState('')
  const [showCountryList, setShowCountryList] = useState(true);
  const [countryselected, setCountrySelected] = useState(false)
  const [userData, setUserData] = useState('')
  const [showuserData, setShowUserData] = useState(false)
  const [currentWatching, setCurrentWatching] = useState('Global')

  const [allcountries, setContries] = useState([])

  const [selectedmonth, setselectedMonth] = useState(currentMonth)
  const [selectedyear, setselectedYear] = useState(currentYear)

  const [levels, setLevels] = useState([])
  const [selectedLevel, setSelectedLevel] = useState("1")

  let countries = []

  const pics = [one, two, three, four, five, six, seven, eight, nine, ten]
  const colors = ['bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900', 'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900', 'bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500', 'bg-gradient-to-r from-emerald-500 to-lime-600', 'bg-gradient-to-r from-pink-700 to-purple-900', 'bg-gradient-to-l from-lime-400 to-lime-800', 'bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...', 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300', 'bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900', 'bg-gradient-to-l from-emerald-500 to-emerald-900']



    useEffect(()=>{
      
if(selectedmonth&&selectedyear){

  renderCountries();
  Filtering();
  renderLevels();
// countriesAccordingtoLevel()
}

      

    },[selectedmonth,selectedyear,worldDataselected,countryselected,countryname,selectedLevel])


async function renderCountries(){
  try {
    const getContries =await axios.get(`https://distinct-gray-sawfish.cyclic.app/getcountries?month=${selectedmonth}&year=${selectedyear}&level=${selectedLevel}`)

            
                
            {getContries.data.map((item)=>{
                
                countries.push(item._id)
            })}
           
              setContries([])
             setContries(countries)
              

  } catch (error) {
    
  }
}

async function renderLevels(){
  
  const getLevels = await axios.get(`https://distinct-gray-sawfish.cyclic.app/getlevels`)

 if(getLevels.data) setLevels(getLevels.data)
 
}


async function Filtering(){
  // if country is not selected
  if(currentWatching==='Global'){
  try {
     const response = await axios.get(`https://distinct-gray-sawfish.cyclic.app/search/filter?year=${selectedyear}&month=${selectedmonth}&level=${selectedLevel}`);
    
     if (response.data) {
       
     
      
      
       const sortedData2 = response.data.sort((a, b) => b.score - a.score).slice(0,10);
                   setWorldData(sortedData2);

      }
  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}else{


// if country is selected
try {
   

  const response = await axios.get(`https://distinct-gray-sawfish.cyclic.app/search/filter?year=${selectedyear}&month=${selectedmonth}&country=${countryname}&level=${selectedLevel}`);
   
    if (response.data) {
    const sortedData = response.data.sort((a, b) => b.score - a.score);
        const top10Data = sortedData.slice(0, 10);
        setCountryData(top10Data)
   
   }


} catch (error) {
 console.error('Error fetching data:', error);
}
}

}






const WorldtoBackend = async()=>{
  
  setCurrentWatching('Global')
  setShowUserData(false)
  setCountrySelected(false)
  setShowCountryList(false)
  setWorldDataselected(true)

}

async function handleSingleUser(item){
              
              setCurrentWatching(item.username)
              setWorldDataselected(false)
              setCountrySelected(false)


              const singleData = await axios.post('https://distinct-gray-sawfish.cyclic.app/leaderboard/user',{username:item.username});
              const sortedData3 = singleData.data.sort((a, b) => b.score - a.score).slice(0,10);
              setUserData(sortedData3);
              if(sortedData3) setShowUserData(true)
           


}


const handleDateConversion= (date)=>{

  const datee = new Date(date);
  const day = datee.getFullYear() +"-"+(datee.getMonth()+1) + "-" + datee.getDate()
  return day
}

const handleHoursConversion=(dater)=>{
  const date= new Date(dater)
  
  let hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Format hours, minutes, and seconds with leading zeros
  var formattedHours = (hours < 10 ? "0" : "") + hours;
  var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  var formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

  // Display the formatted result
  var formattedTime = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  return formattedTime;
}




  return (
<>
<div className='flex  '>


<div className='buttons mt-40 text-left  '>
  
<FilterCounty  selectedmonth={selectedmonth} setselectedMonth={setselectedMonth} selectedyear={selectedyear} setselectedYear={setselectedYear}/>
   <div className='flex hover:bg-slate-500  hover:scale-105  bg-gray-100 bg-opacity-25 pr-5  rounded-tl-lg'>

  <img className='h-4 mt-2 mr-1' src={`${globe}`} />


<button className='text-white font-bold text-xl' onClick={WorldtoBackend}>Global </button>

</div>
    

    

    
  <div className='bg-gray-100 bg-opacity-25 pl-2 rounded-bl-xl flex flex-col gap-1'>

   

{allcountries.map((country) => (
         <ul> 
          
          <a key={country} className=' font-semibold   cursor-pointer text-white hover:text-yellow-400 ' onClick={() => {
    
    setWorldDataselected(false)
    setShowUserData(false)
    setCountrySelected(true)
    setCountryname(country)
    setCurrentWatching(country)
  }    
    }>
    
    <div className=''> {country} </div>
  </a>
      </ul>
))}



  </div>
     </div>



     <div className="bg-gray-700 bg-opacity-70  h-[98vh] items-end rounded-3xl bg-cover shadow-blue-400 shadow-md z-10" >
      <div className="grid grid-cols-4  w-[32rem]">
        <div className="object-contain col-start-1 items-center text-left rounded-2xl col-span-4">
          <h2 className='  text-4xl font-test text-center text-yellow-500 pt-2 rounded-t-3xl '>Leaderboard </h2>
          <div className=' via-purple-900 to-slate-900 items-center text-right'>



            {/* Below the leaderboard  */}
                <div className='flex justify-between'>
          
                <p className='text-white mb-1 font-bold ml-6'> Level : {selectedLevel}</p>
               
                <Link className='text-white underline mb-1 font-bold ml-6' to={'/tournament'}>Tournaments </Link>



                  {/* <p className='text-white mb-1 font-bold ml-auto mr-6'>{worldDataselected ? 'Global' : `${countryname}`}</p> */}
                  <p className='text-white mb-1 font-bold ml-auto mr-6'>{currentWatching}</p>
               
                </div>
              </div>


        </div>


    

        <div className="bg-[#fff] font-poppins text-lg text-right pr-4 font-bold  rounded-l-3xl ml-2">Rank</div>
        <div className=" col-span-2 ">
          <h2 className='bg-[#fff] text-left text-lg font-extrabold font-poppins pl-6 pl-2 ' >{showuserData? "Date&time": "Name"}</h2>
        </div>
        <div className="bg-[#fff] font-bold text-lg text-left font-poppins   rounded-r-3xl   mr-2">Scores</div>
        </div>
      


{
worldDataselected&&

<>
{worldData.length===0&&
          <div className='text-white  font-poppins pt-48 '>
                <h3>Sorry , NO RECORDS FOUND! </h3> 
                <p className='text-[10px]'> Please select other records</p>
                </div> }
{worldData.map((item, index) => (
            
              <React.Fragment key={item.rank}>
      
      
      <div className={`grid grid-cols-4    ${colors[index]}   bg-opacity-40  shadow-sm  shadow-yellow-600  bg-opacity-80  mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit `}
      >
 

        
 <div className=" text-center  text-white ">
  <img
    className="h-64 w-44 -mt-20  -ml-12 origin-bottom    w-16 mb absolute "
    src={pics[index]}
  />
  {/* <p className="text-xl font-poppins relative ">

    {getFormattedIndex(index + 1)}
  </p> */}
</div>
<div className="col-span-2 h-12 mt-2 text-white">
<a
            href="#"
            onClick={()=> handleSingleUser(item)}
            className="text-left text-md   font-poppins hover:underline cursor-pointer"
          >
            <h3 className='-mt-2 -ml-1'>{item.username}</h3>
          </a>
                    <p className='text-[11px] text-left -mt-1  #4ade80 '>{item.country}</p>
                  </div>
                 <TopListing item={item}/>
                </div>
              </React.Fragment>
           
          ))}
          
</>

}

{countryselected && 
<>
{countryData.length===0&&
          <div className='text-white  font-poppins pt-48 '>
                <h3>Sorry , NO RECORDS FOUND! </h3> 
                <p className='text-[10px]'> Please select other records</p>
                </div> }
{countryData.map((item, index) => (
            
            <React.Fragment key={item.rank}>
      
    
    <div className={`grid grid-cols-4    ${colors[index]}   bg-opacity-40  shadow-sm  shadow-yellow-600  bg-opacity-80  mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit `}


    >



      
<div className=" text-center  text-white ">
<img
  className="h-64 w-48 -mt-20  -ml-12 origin-bottom    w-16 mb absolute "
  src={pics[index]}
/>
</div>

          <div className="col-span-2 h-12 mt-2 text-white">
          <a
            href="#"
            onClick={()=> handleSingleUser(item)}
            className="text-left text-md  font-poppins hover:underline cursor-pointer"
          >
                      <h3 className='-mt-2 pt-2 -ml-1'>{item.username}</h3>

          </a>

          

                    
                  </div>
                  
                 <CountryListing item={item}/>

              </div>
              
            </React.Fragment>
         
        ))}
      
</>
}


{ showuserData && userData.map((item, index) => (
            
           <UserListing item={item} index={index} handleSingleUser={handleDateConversion} handleDateConversion={handleDateConversion} handleHoursConversion={handleHoursConversion}/>
         
        ))}

    </div>

     
    <test className='buttons mt-40 text-left  '>
  
 
     <div className='flex hover:bg-slate-500  hover:scale-105  bg-gray-100 bg-opacity-25 pr-5  rounded-tl-lg'>
  </div>
      
  

      
  
      {/* third  */}
      
    <test className='bg-gray-100 bg-opacity-25 pl-2 rounded-br-xl flex flex-col gap-1 pr-2 py-1'>
  
     
  
  {levels.map((level) => (
           <ul> 
            
            <a key={level}  className=' font-semibold cursor-pointer text-white hover:text-yellow-400' onClick={() => { setSelectedLevel(level) }  
 }>
      
      <div className=''> Level {level} </div>
    </a>
        </ul>
  ))}
  
  
  
    </test>

       </test>



    </div>



       </>
  );
};

export default Leaderboard;