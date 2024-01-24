import { backendAPI } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { IProjectListItem } from "../types";
import useSecurePage from "@/hooks/useSecurePage";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
    const { companyId } = useParams();
    const { data, isError, error } = useQuery<
        IProjectListItem[],
        AxiosError<{ error: string }>
    >({
        queryKey: ["projects", companyId],
        queryFn: () =>
            axios.get(backendAPI.project(companyId)).then((res) => res.data),
        enabled: !!companyId,
        staleTime: Infinity,
    });

    useSecurePage({ isError, error });

    return (
        <div>
            {data && data.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-3">
                    {data.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xs text-gray-700">No project found</p>
            )}
        </div>
    );
}
