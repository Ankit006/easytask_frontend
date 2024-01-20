import useFetchMemberGroups from "@/hooks/useFetchMemberGroups";
import AssignMemberToGroup from "./AssignMemberToGroup";
import MemberGroupCard from "./MemberGroupCard";

interface Props {
    memberId: string | undefined;
    companyId: string | undefined;
}

export default function MemberGroups({ memberId, companyId }: Props) {
    const { data } = useFetchMemberGroups({ companyId, memberId })

    return (
        <div>
            <div className="flex items-center  justify-between">
                <div className="inline-block">
                    <h1 className="text-violet-600 text-sm font-semibold mb-1">Groups</h1>
                    <div className="h-[2px] rounded-lg bg-violet-700 w-full"></div>
                </div>

                <AssignMemberToGroup companyId={companyId} memberId={memberId} />
            </div>

            <div>
                {data && data.length > 0 ? (
                    <div>
                        {data.map((group) => (
                            <MemberGroupCard
                                group={group}
                                companyId={companyId}
                                memberId={memberId}
                                key={group._id}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-8 text-xs text-gray-500">
                        No group assigned
                    </p>
                )}
            </div>
        </div>
    );
}
