import { backendAPI } from "@/constants";
import { ICompanyMember } from "@/model";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";

export default function useFetchMemberInfo() {
  const { companyId } = useParams();
  const result = useQuery<ICompanyMember, AxiosError<{ error: string }>>({
    queryKey: ["header", companyId],
    staleTime: Infinity,
    enabled: !!companyId,
    queryFn: () =>
      axios.get(backendAPI.header(companyId)).then((res) => res.data),
  });

  return result;
}
