import { Outlet } from "react-router-dom"
import { apiClient } from "./utilities/apiClient"
import useAdminStore from "./store/store"
import { useEffect } from "react"
const App = () => {
  const {setLoggedIn , isLoggedIn} = useAdminStore()
  const fetchAdmin = async () => {
      const response = await apiClient.post("/admin/get");
      console.log(response.data);
      setLoggedIn(true);
  };

  useEffect(()=>{
    fetchAdmin();
  },[isLoggedIn,setLoggedIn])
  return (
    <Outlet/>
  )
}

export default App