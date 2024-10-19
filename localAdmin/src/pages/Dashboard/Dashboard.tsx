import useAdminStore from "@/store/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const {isLoggedIn} = useAdminStore();
    const navigator = useNavigate()
    useEffect(()=>{
        if (!isLoggedIn){
            navigator("/auth");
        }
    },[isLoggedIn,navigator])
  return (
    <>
     {
        isLoggedIn ? <h1>Logged in </h1> : null
     }
     </>
  )
}

export default Dashboard