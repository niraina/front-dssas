/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useEffect, useState } from "react";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { api } from "@/shared/api";
import { useNavigate } from "react-router-dom";
type RegisterState = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const [data, setData] = useState<RegisterState>({
    email: "",
    password: "",
    name: "",
    confirm_password: "",
  });
  const [checkedPassword, setCheckedPassword] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Mots de passe pas identique"
  );
  const navigate = useNavigate()
  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!checkedPassword) {
      return;
    }
    if (data.password.length < 8) {
      setErrorMessage("Le mots de passe doit avoir au moin 8 caractère");
      setCheckedPassword(false);
      return;
    }
    await api
      .post("/users", {
        email: data.email,
        password: data.password,
        name: data.name,
      })
      .then((response) => {
        if (response.status === 200) {
          setData({
            email: "",
            password: "",
            name: "",
            confirm_password: "",
          });
        } else {
          console.log(response);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCheckedPassword(data.password === data.confirm_password);
  }, [data]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[600px] mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-4">Login page</h1>
        <Field
          type="text"
          placeholder="Nom et prénom"
          prefix={<MailOutlined />}
          value={data.name}
          onChange={(e) => onChange({ name: e?.target?.value })}
          label="Nom et prénom"
          name="name"
        />
        <Field
          type="email"
          placeholder="Adresse email"
          prefix={<MailOutlined />}
          value={data.email}
          onChange={(e) => onChange({ email: e?.target?.value })}
          label="Adresse email"
          name="email"
        />

        <Field
          type="password"
          placeholder="Text...."
          prefix={<UserOutlined />}
          value={data.password}
          onChange={(e) => onChange({ password: e?.target?.value })}
          label="Password"
          name="password"
        />
        <Field
          type="password"
          placeholder="Text...."
          prefix={<UserOutlined />}
          value={data.confirm_password}
          onChange={(e) => onChange({ confirm_password: e?.target?.value })}
          label="Password"
          name="password"
        />
        {!checkedPassword ? (
          <p className="text-red-900 text-[12px] italic mb-4 -my-2">
            {errorMessage}
          </p>
        ) : (
          ""
        )}
        <div className="flex items-center gap-2">
          <Button type="primary" className="bg-slate-600 mt-2" onClick={handleLogin}>
            S'inscrire
          </Button>
          <Button type="link" onClick={() => navigate('/')}>Se connecter</Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
