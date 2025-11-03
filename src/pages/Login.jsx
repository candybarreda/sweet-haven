import React from "react";
import AuthModal from "../components/component/AuthModal";
import { useAuth } from "../context/authContext";


function Login(){
    const AuthModal = ({ onClose }) => {
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    }
  
    const handleLogin = async () => {
      const result = await login(loginData.email, loginData.password);
      if (result.success) {
        alert(result.message);
        onClose();
      } else {
        alert(result.message);
      }
    };
  

  return(
    <></>
  

  );
};


export default Login;