import { Skeleton } from "@/components/ui/skeleton";

export default function MemberDetailsSkeleton() {
    return (
        <div className="container mx-auto mt-8">
            <Skeleton className="w-12 h-12 rounded-full" />
        </div>
    )
}
