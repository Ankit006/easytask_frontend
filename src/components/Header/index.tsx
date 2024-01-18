import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchMemberInfo from "@/hooks/useFetchMemberInfo";
import useSecurePage from "@/hooks/useSecurePage";
import { resizeImage } from "@/lib/utils";
import React from "react";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Center from "../global/Center";
import ProfileMenu from "./components/ProfileMenu";
import placeholderProfileImg from "/placeholder-profile.svg";

export default function Header() {
    const { data, isLoading, isError, error } = useFetchMemberInfo();

    useSecurePage({ error, isError });

    if (isError) {
        return (
            <div className=" py-4 border-b border-gray-300 bg-red-200 text-red-600">
                <p className="text-center">{error.response?.data.error}</p>
            </div>
        );
    }

    return (
        <div className=" py-4 border-b border-gray-300">
            <div className="container mx-auto flex items-center justify-between">
                <nav className="md:block flex items-center space-x-6 text-sm">
                    <NavLink
                        to={"members"}
                        className={({ isActive }) =>
                            `${isActive ? " text-violet-700 font-semibold" : "text-gray-800"} `
                        }
                    >
                        Members
                    </NavLink>
                    <NavLink
                        to={"projects"}
                        className={({ isActive }) =>
                            `${isActive ? " text-violet-700 font-semibold" : "text-gray-800"}`
                        }
                    >
                        Projects
                    </NavLink>
                    <NavLink
                        to={"chats"}
                        className={({ isActive }) =>
                            `${isActive ? " text-violet-700 font-semibold" : "text-gray-800"}`
                        }
                    >
                        Chats
                    </NavLink>
                </nav>
                <div className="md:hidden block">
                    <Sheet>
                        <SheetTrigger className=" border border-gray-500 rounded-lg w-8 h-8 text-lg relative">
                            <Center>
                                <IoMenuOutline />
                            </Center>
                        </SheetTrigger>
                        <SheetContent side={"left"} className="w-2/4">
                            <SheetHeader className="mt-8">
                                <SheetTitle className="text-left">Overview</SheetTitle>
                                <ul className="flex flex-col space-y-2 items-baseline font-poppins text-sm w-full">
                                    <SideBarButton>
                                        <MdDashboard />
                                        <span>Members</span>
                                    </SideBarButton>
                                    <SideBarButton>
                                        <FaProjectDiagram />
                                        <span>Projects</span>
                                    </SideBarButton>
                                    <li className="flex items-center space-x-2 hover:bg-gray-100 py-1 px-2 rounded w-full">
                                        <IoMdChatbubbles />
                                        <span>Chats</span>
                                    </li>
                                </ul>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>
                {isLoading && <Skeleton className="w-10 h-10 rounded-full" />}
                {data && (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar className=" w-10 h-10">
                                <AvatarImage
                                    src={
                                        data.profilePic
                                            ? resizeImage(data.profilePic.url, 80, 80)
                                            : placeholderProfileImg
                                    }
                                    alt={data.firstName}
                                />
                                <AvatarFallback>{data.firstName}</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        {data && <ProfileMenu header={data} />}
                    </Popover>
                )}
            </div>
        </div>
    );
}

function SideBarButton({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center space-x-2 hover:bg-gray-100 py-1 px-2 rounded w-full">
            {children}
        </div>
    );
}
