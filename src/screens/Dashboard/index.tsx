import Header from "@/components/Header";
import { useParams } from "react-router-dom";
import Members from "../Members";

export default function Dashboard() {
    const { tab } = useParams();
    return (
        <div>
            <Header />
            {tab === "members" && <Members />}
        </div>
    )
}
