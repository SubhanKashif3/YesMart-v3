import { apiClient } from "@/utilities/apiClient"
import { Button } from "../ui/button"
import useAdminStore from "@/store/store"
import { useNavigate } from "react-router-dom"


const Account = () => {
  const {logoutUser} = useAdminStore()
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
     const res = await apiClient.post("/admin/logout",{},{withCredentials : true});
     if (res.status === 200){

       logoutUser();
       nav("/auth")
     }
      
      
      
    } catch (error) {
      
    }
  }
  return (
    <div className="">
      <h1>Click on the logout button to logout</h1>
      <br />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Account