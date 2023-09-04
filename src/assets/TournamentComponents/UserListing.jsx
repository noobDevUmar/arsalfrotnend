import React from "react";


const UserListing = ({item,index,handleDateConversion,handleSingleUser,handleHoursConversion}) => {
    const colors = ['bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900','bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900','bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500','bg-gradient-to-r from-emerald-500 to-lime-600','bg-gradient-to-r from-pink-700 to-purple-900','bg-gradient-to-l from-lime-400 to-lime-800','bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...','bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900 to-yellow-300','bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900','bg-gradient-to-l from-emerald-500 to-emerald-900']



    return ( 
        <>
           <React.Fragment key={item.rank}>
       
       {/* <div className='grid grid-cols-4 mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit overflow-hidden' style={{ backgroundImage: "url('https://www.creatisimo.net/wp-content/uploads/2020/05/blue-background-textures-cover.jpg')" }}> */}
       {/* <div className='grid grid-cols-4 mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit overflow-hidden'
    style={{ backgroundImage: `url(${paint})` }}> */}
    
    <div className={`grid grid-cols-4    ${colors[index]}   bg-opacity-40  shadow-sm  shadow-yellow-600  bg-opacity-80  mt-3 h-10 ml-10 mb-2.5 rounded-3xl w-[440px] mt-1 bg-opacity-50 bg-cover bg-fit `}>


      
<div className=" text-center  text-white ">
{/* <img
  className="h-64 w-48 -mt-20  -ml-12 origin-bottom    w-16 mb absolute "
  src={pics[index]}
/> */}
<h2 className='mt-1 mr-4 text-2xl font-poppins'>{index+1} </h2>
</div>

          <div className="col-span-2 h-12 mt-2 text-white">
          <a
            href="#"
            onClick={()=> handleSingleUser(item)}
            className="text-left text-md  font-poppins hover:underline cursor-pointer"
          >
             <h3 className='-mt-2 -ml-1'>{handleDateConversion(item.createdAt)}</h3>
          </a>

          

                    <p className='text-[11px] text-left -mt-1  #4ade80 '>{handleHoursConversion(item.createdAt)}</p>
                  </div>
                  <>
        
        
        <div className='flex'>

          <div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-4 text-center mt-3 pr-1 text-yellow-400">
<path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
</svg>
          </div>
      <div>

          <h3 className="text-white text-left font-bold  "> {item.score} </h3>
          <p className='text-[11px] text-left -mt-1 #4ade80  text-white'>{item.duration}</p>

      </div>
        </div>


</>
              </div>
            </React.Fragment>
         
        
        </>
     );
}
 
export default UserListing;