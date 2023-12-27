import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedin } from "@/store/slices/AuthSlice";

export default function useSecurePage() {
  const { isLoggedin } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

  return { dispatch, setIsLoggedin, isLoggedin };
}
