import { Button } from "@nextui-org/react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"


export const Footer=()=>{
    
return <div className="flex items-center w-full p-4 gap-x-2">
    <Button className="bg-white w-full" radius="sm" size="lg" variant="bordered">
        <FcGoogle></FcGoogle>
    </Button>
    <Button className=" bg-white w-full" radius="sm"  size="lg" variant="bordered">
        <FaGithub></FaGithub>
    </Button>
</div>
}