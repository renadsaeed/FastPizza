import React from 'react'
import {Link , useNavigate} from "react-router-dom"
export default function LinkButton({children , to}) {
    const classname="text-sm text-blue-200 hover:text-blue-600 hover:underline";
    const navigate = useNavigate();
       console.log("jjjjj");
    if(to === "0"){
      console.log("خخخخخ");
      return(
        <button onClick={() => navigate(-1)} className={classname}>{children}</button> 
      )
    }
  return (
    <Link to={to} className={classname}>{children} </Link>
  )
}
