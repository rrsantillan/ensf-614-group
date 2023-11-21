import React from 'react'
import { Link, useParams } from 'react-router-dom';



function Home(){
  const { username } = useParams();
  // const handleSumbit =(event)=> {
  //   console.log(username)
  // }

  return(
    <div className="d-flex vh-100 justify-content-center align-items-top">
        <div className='p-3 bg-white w-75'>
            <h2>Home Page</h2>
            <form action=''>
                <Link to={`../CurrentFlight/${username}`} className='btn btn-default border w-100 bg-light'> Current Flights </Link>
                <Link to={`../FindFlight/${username}`} className='btn btn-default border w-100 bg-light'> FindFlight </Link>
              
            </form>
            
        </div>
    </div>
      

      
  )

}
export default Home