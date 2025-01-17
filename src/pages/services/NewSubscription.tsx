/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useState } from "react";
import { Button } from "antd";
import { api } from "@/shared/api";
import { useNavigate, useSearchParams } from "react-router-dom";

const NewSubscription = () => {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("service_uuid");
  const [data, setData] = useState<any>({
    label: "",
    description: "",
    duration: 7,
    price: 0,
    service_uuid: uuid,
  });
  const navigate = useNavigate();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = () => {
    try {
      const response = api.post("/subscriptions", {
        label: data.label,
        description: data.description,
        duration: +data.duration,
        price: +data.price,
        service_uuid: uuid,
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
        placeholder="Description"
        value={data.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ description: e?.target?.value })
        }
        label="Description"
        name="description"
      />
      <Field
        type="text"
        placeholder="Label"
        value={data.label}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ label: e?.target?.value })
        }
        label="Label"
        name="label"
      />
      <Field
        type="number"
        placeholder="Prix"
        value={data.price}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange({ price: e?.target?.value })
        }
        label="Prix"
        name="price"
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
        min={7}
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

export default NewSubscription;
