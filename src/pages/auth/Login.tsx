/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { loginApi } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/widgets/Authcontext";
import { logo } from "@/shared/MediaPath";
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
      login(response.data.access_token);
      setLoginState({
        email: "",
        password: "",
      });
      navigate('/front')
    } catch (error: any) {
      setError(error?.response?.data?.detail);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[600px] mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-6">
          <img src={logo} alt="logo" className="w-full max-w-[200px] mx-auto text-center" />
        </h1>
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
          placeholder="Mot de passe"
          prefix={<UserOutlined />}
          value={loginState.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ password: e?.target?.value })
          }
          label="Mot de passe"
          name="password"
        />
        {error && <p className="text-red-800 my-2">{error}</p>}
        <div className="flex items-center gap-2">
          <Button type="primary" className="bg-slate-600 mt-2" onClick={handleLogin}>
            Se connecter
          </Button>
          <Button type="link" className="pt-2" onClick={() => navigate('/register')}>S'inscrire</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
