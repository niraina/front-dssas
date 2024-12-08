/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useState } from "react";
import { ServicesTypes } from ".";
import { Button } from "antd";
import { api } from "@/shared/api";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [data, setData] = useState<ServicesTypes>({
    name: "",
    description: "",
    status: 0,
    type: "VIDEO",
  });
  const navigate = useNavigate();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = () => {
    try {
      const response = api.post("/services", {
        name: data.name,
        description: data.description,
        status: data.status,
        type: data.type,
      });
      //WIP
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Field
        type="text"
        placeholder="Nom"
        value={data.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ name: e?.target?.value })
        }
        label="Nom"
        name="name"
      />
      <Field
        type="text"
        placeholder="Description"
        value={data.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ description: e?.target?.value })
        }
        label="Description"
        name="description"
      />
      <label className="mt-3">Type</label>
      <Select
        style={{ width: 120 }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ type: e })
        }
        options={[
          { value: "VIDEO", label: "Vidéo" },
          { value: "AUDIO", label: "Audio" },
          { value: "FORMATION", label: "Fonramtion" },
          { value: "LOGICIEL", label: "Logiciel" },
        ]}
        placeholder="Séléctionner..."
        className="block !w-full mb-3"
      />
      <div className="flex gap-2 items-center">
        <Button type="primary" className="bg-slate-600 mt-2" onClick={handleSend}>
          Se connecter
        </Button>
        <Button type="link" onClick={() => navigate(-1)} className="pt-2">Retour</Button>
      </div>
    </div>
  );
};

export default Add;
