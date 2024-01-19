import { IGroup } from "@/model"

interface Props {
    groups: IGroup[]
}

export default function MemberGroups({ groups }: Props) {
    return (
        <div>
            <div className="inline-block">
                <h1 className="text-violet-600 text-sm font-semibold mb-1">Groups</h1>
                <div className="h-[2px] rounded-lg bg-violet-700 w-full"></div>
            </div>
        </div>
    )
}
