import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { backendAPI } from "@/constants";
import useSecurePage from "@/hooks/useSecurePage";
import { IUser } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import MemberCard from "./MemberCard";

export default function MemberList() {
    const { companyId } = useParams();
    const { data, isError, error } = useQuery<
        IUser[],
        AxiosError<{ error: string }>
    >({
        queryKey: ["members", companyId],
        queryFn: () =>
            axios.get(backendAPI.memberList(companyId)).then((res) => res.data),
        enabled: !!companyId,
    });

    useSecurePage({ isError, error });
    return (
        <div className="mt-12">
            {data && (
                <div>
                    {data.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((user) => (
                                    <MemberCard user={user} key={user._id} />
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No user found</p>
                    )}
                </div>
            )}
        </div>
    );
}
