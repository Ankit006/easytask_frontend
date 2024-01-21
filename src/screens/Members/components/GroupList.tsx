import useFetchGroups from "@/hooks/useFetchGroups";
import { useParams } from "react-router-dom";
import GroupCard from "./GroupCard";

export default function GroupList() {
    const { companyId } = useParams();

    const { data, isError, error } = useFetchGroups({ companyId })
    if (isError) {
        return (
            <p className="text-center mt-4 text-red-600">
                {error.response?.data.error}
            </p>
        );
    }

    return (
        <div>
            {data && (
                <div>
                    {data.length > 0 ? (
                        <div className="flex items-center flex-wrap space-x-2 space-y-2">
                            {data.map((group) => (
                                <GroupCard
                                    companyId={companyId}
                                    group={group}
                                    key={group._id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-center text-gray-600">
                            No group created
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
