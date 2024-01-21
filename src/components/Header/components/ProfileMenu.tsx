import { PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ICompanyMember } from "@/model";
export default function ProfileMenu({ header }: { header: ICompanyMember }) {
    return (
        <PopoverContent
            align="end"
            className="w-48 text-sm shadow-sm py-2 overflow-hidden px-0"
        >
            <div className="px-2">
                <p className=" capitalize font-semibold">
                    {header.firstName} {header.lastName}
                </p>
                <p className=" text-gray-600  break-words text-xs">{header.email}</p>
            </div>
            <Separator className="my-2" />
            <div>
                <ul className="flex flex-col space-y-1">
                    <li className="hover:bg-gray-100 transition duration-300 px-2 rounded mx-1 py-[5px]">
                        Account
                    </li>
                    <li className="hover:bg-red-100 transition duration-300 px-2 rounded mx-1 py-[5px]">
                        <button className="text-red-600">Logout</button>
                    </li>
                </ul>
            </div>
        </PopoverContent>
    );
}
