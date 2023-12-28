import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { Input } from "@/components/ui/input";
export default function AddMemberModal() {
    const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
    const [searchText, setSearchText] = useState("");
    return (
        <div>
            <Button onClick={() => setShowAddMemberDialog(true)}>
                <FaPlus />
                <span className="ml-1">Add Member</span>
            </Button>
            <Dialog
                open={showAddMemberDialog}
                onOpenChange={() => setShowAddMemberDialog(false)}
            >
                <DialogContent className="max-h-[500px] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add Member</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <Input
                            type="email"
                            placeholder="Search by email"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button variant={"secondary"}>Search</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
