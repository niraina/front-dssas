/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { api } from "@/shared/api";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { ServicesTypeComplet } from "../dashboard";

const Add = () => {
  const [data, setData] = useState<any>({
    label: "",
    description: "",
    duration: 7,
    price: 0,
    service_uuid: "",
  });

  const [services, setServices] = useState<ServicesTypeComplet[]>([]);
  const navigate = useNavigate();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = () => {
    try {
      const response = api.post("/subscriptions", data);
      //WIP
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log(services);
  return (
    <div>
      <label className="mt-3">Service</label>
      <Select
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ service_uuid: e })
        }
        options={services.map((item: ServicesTypeComplet) => {
          return {
            value: item.uuid,
            label: item.name,
          };
        })}
        placeholder="Séléctionner..."
        className="block w-full mb-3"
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
      <Field
        type="number"
        placeholder="Durée"
        value={data.duration}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ duration: e?.target?.value })
        }
        label="Durée"
        name="duration"
      />
      <div className="flex gap-2 items-center">
        <Button
          type="primary"
          className="bg-slate-600 mt-2"
          onClick={handleSend}
        >
          Ajouter
        </Button>
        <Button type="link" onClick={() => navigate(-1)} className="pt-2">
          Retour
        </Button>
      </div>
    </div>
  );
};

export default Add;
