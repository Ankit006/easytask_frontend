import AddMemberModal from "@/screens/Members/components/AddMemberModal.tsx";
import MemberList from "./components/MemberList";
import AddGroupModel from "./components/AddGroupModel";

export default function Members() {
    return (
        <div className="container mx-auto mt-8">
            <div className="flex items-center space-x-4">
                <AddMemberModal />
                <AddGroupModel />
            </div>
            <MemberList />
        </div>
    )
}
