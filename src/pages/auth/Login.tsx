/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { loginApi } from "@/shared/api";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/modules/auth/core/actions";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/widgets/Authcontext";
type LoginState = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (v: any) => {
    setLoginState((prev: any) => ({ ...prev, ...v }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await loginApi.post("/login", {
        username: loginState.email,
        password: loginState.password,
      });
      dispatch(setCurrentUser(response.data));
      login(response.data.access_token);
      setLoginState({
        email: "",
        password: "",
      });
      navigate('/dashboard')
    } catch (error: any) {
      setError(error?.response?.data?.detail);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[600px] mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-4">Login page</h1>
        <Field
          type="email"
          placeholder="Adresse email"
          prefix={<MailOutlined />}
          value={loginState.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ email: e?.target?.value })
          }
          label="Adresse email"
          name="email"
        />
        <Field
          type="password"
          placeholder="Text...."
          prefix={<UserOutlined />}
          value={loginState.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ password: e?.target?.value })
          }
          label="Password"
          name="password"
        />
        {error && <p className="text-red-800 my-2">{error}</p>}
        <Button type="primary" className="bg-slate-600 mt-2" onClick={handleLogin}>
          Se connecter
        </Button>
      </div>
    </div>
  );
};

export default Login;
