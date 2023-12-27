import { backendAPI } from "@/constants";
import { IHeader } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import placeholderProfileImg from "/placeholder-profile.svg";
import ProfileMenu from "./components/ProfileMenu";
import { IoMenuOutline } from "react-icons/io5";
import Center from "../global/Center";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MdDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import React from "react";
import { resizeImage } from "@/lib/utils";
import NavButtton from "./components/NavButtton";

export default function Header() {
    const { companyId, tab } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery<IHeader, AxiosError<{ error: string }>>({
        queryKey: ["header", companyId],
        staleTime: Infinity,
        enabled: !!companyId,
        queryFn: () =>
            axios.get(backendAPI.header(companyId)).then((res) => res.data),
    });

    function onNavPressend(tab: string) {
        navigate(`/dashboard/${companyId}/${tab}`);
    }

    return (
        <div className=" py-4 border-b border-gray-300 bg-white/30 backdrop-blur-3xl">
            <div className="container mx-auto flex items-center justify-between">
                <nav className="md:block hidden">
                    <ul className="text-sm text-gray-600 flex items-center space-x-4">
                        <li>
                            <NavButtton
                                highlight={tab === "members"}
                                onPressed={() => onNavPressend("members")}
                            >
                                <span>Members</span>
                            </NavButtton>
                        </li>
                        <li>
                            <NavButtton
                                highlight={tab === "projects"}
                                onPressed={() => onNavPressend("projects")}
                            >
                                <span>Projects</span>
                            </NavButtton>
                        </li>
                        <li>
                            <NavButtton
                                highlight={tab === "chats"}
                                onPressed={() => onNavPressend("chats")}
                            >
                                <span>Chats</span>
                            </NavButtton>
                        </li>
                    </ul>
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
