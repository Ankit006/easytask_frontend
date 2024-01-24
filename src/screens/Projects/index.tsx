import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ProjectList from "./components/ProjectList";
export default function Projects() {
    return (
        <div className="container mx-auto mt-8">
            <NavLink to={"create"}>
                <Button>
                    <FaPlus />
                    <span className="ml-2">Add project</span>
                </Button>
            </NavLink>
            <div className="mt-8">
                <ProjectList />
            </div>
        </div>
    )
}
