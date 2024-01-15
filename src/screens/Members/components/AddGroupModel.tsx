import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

export default function AddGroupModel() {
    return (
        <div>
            <Button>
                <FaPlus />
                <span className="ml-1">Add Group</span>
            </Button>
        </div>
    )
}
