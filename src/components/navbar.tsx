import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Codepen } from "lucide-react"


const Navbar = () => {
    return(
        <>
        <div className="bg-slate-700 py-3">
            <div className="container flex justify-between items-center ">
                <Link className="text-white" href="/"><Codepen /></Link>
                <Link className= {buttonVariants({ variant: "outline" })} href="/sign-in">Login</Link>
            </div>
        </div>
        </>
    )
}

export default Navbar