import { formatDate } from "@/lib/utils";
import { IProjectListItem } from "../types";
import { Progress } from "@/components/ui/progress";
import { MdDateRange } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink } from "react-router-dom";
interface Props {
    project: IProjectListItem;
}

export default function ProjectCard({ project }: Props) {
    return (
        <div className="border border-gray-200 rounded shadow-sm hover:shadow-lg transition duration-200 p-4">
            <h1 className="font-semibold text-gray-700 capitalize">{project.name}</h1>
            <p className="text-xs text-gray-500 font-semibold mt-1">
                Cost -{" "}
                <span className="text-gray-600">&#8377;{project.projectCost}</span>
            </p>
            <div>
                <p className="text-right text-xs text-gray-400">{project.workDone}%</p>
                <Progress value={project.workDone} className="w-full mt-2 h-1" />
            </div>
            <div className="mt-3 flex items-center justify-between">
                <p className=" text-[10px] bg-gray-200 inline-block rounded-2xl px-2 py-1 text-gray-600">
                    <span className="flex items-center space-x-1">
                        <MdDateRange />
                        <span> {formatDate(project.projectDeadLine)}</span>
                    </span>
                </p>
                <Popover>
                    <PopoverTrigger>
                        <HiOutlineDotsVertical />
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-24 px-1 py-3">
                        <ul>
                            <li className="text-sm text-center text-gray-700 hover:bg-slate-100 transform duration-300 rounded py-1">
                                <NavLink to={`update/${project._id}`}>Update</NavLink>
                            </li>
                            <li className="text-sm text-center text-gray-700 hover:bg-slate-100 transform duration-300 rounded py-1">
                                <NavLink to={`${project._id}/sprints`}> Sprints</NavLink>
                            </li>
                        </ul>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
