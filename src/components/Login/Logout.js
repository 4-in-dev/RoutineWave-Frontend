import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { authActions } from "../../store/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    removeCookie('is_login');
    window.localStorage.removeItem('loginedUser');
    dispatch(authActions.logout());
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;
