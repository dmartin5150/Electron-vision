import { useState, useEffect } from "react"


const Home = () => {

    const [expand, setExpand] = useState(false);

   const  handleWindowSize = () => {
        setExpand(!expand)
   }

   electron.visionAPI.getExpand(expand)
   useEffect (()=> {
     console.log(expand)
    
   },[expand])



    return (
        <div className='home-container'>
            <button onClick={handleWindowSize} className='window-button'>Expand</button>
        </div>
    
    )
}

export default Home