import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { apiClient } from "@/utilities/apiClient"

const Auth = () => {


    const [password , setPassword] = useState<string>("");


    const handleButtonClick = async () => {
        const response = await apiClient.post("/admin/login",{password});
        console.log(response.data)
    }
  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center items-center">
        <div className="w-full max-w-[390px] bg-white p-2 flex justify-center items-center rounded-sm flex-col gap-1 ">
            <h1 className="text-center w-full text-lg mb-2">Login Here To Continue to Dashbaord</h1>
            <div className="flex w-full flex-col gap-1 justify-center items-center">
                <Input placeholder="Enter Password" className="w-[96%] mb-1" value={password} onChange={(e ) => setPassword(e.target.value)}/>
                <Button className="w-[96%] hover:bg-slate-950" onClick={handleButtonClick}>Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Auth