import { AxiosError, HttpStatusCode } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
  error: AxiosError<{ error: string }> | null;
  isError: boolean;
}

export default function useSecurePage({ error, isError }: IProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (
      error !== null &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      queryClient.clear();
      navigate(`/login?redirect_url=${location.pathname}`);
    }
  }, [isError, navigate, error, location, queryClient]);
}
