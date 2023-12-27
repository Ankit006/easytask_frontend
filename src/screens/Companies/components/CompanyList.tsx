import Center from "@/components/global/Center"
import { resizeImage } from "@/lib/utils"
import { ICompany } from "@/model"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip"
import randomColor from "randomcolor"
import { NavLink } from "react-router-dom"

interface CompanyListProps {
    companyList: ICompany[]
}

export default function CompanyList({ companyList }: CompanyListProps) {
    return (
        <div>{
            companyList.length > 0 &&
            companyList.map((company) => (
                <NavLink key={company._id} to={`/dashboard/${company._id}/members`}>
                    <TooltipProvider delayDuration={200} >
                        <Tooltip>
                            <TooltipTrigger>
                                {company.logo ? <img
                                    src={resizeImage(company.logo.url, 100, 100)}
                                    alt={company.name}
                                    height={60}
                                    width={60}
                                    className="rounded-full object-contain"
                                /> : <div className={`w-16 h-16 rounded-full relative`} style={{ backgroundColor: randomColor() }}>
                                    <Center>
                                        <span className="text-lg font-semibold capitalize">{company.name[0]}</span>
                                    </Center>
                                </div>}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{company.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </NavLink>
            ))}</div>
    )
}
