/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { api } from "@/shared/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubscription = () => {
  const {uuid} = useParams();
  const [data, setData] = useState<any>({
    description: "",
    duration: 1,
    price: 0,
  });
  const navigate = useNavigate();

  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = () => {
    try {
      const response = api.put(`/subscriptions/${uuid}`, data);
      //WIP
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async(uuid: string) => {
    try {
      const response = await api.get('/subscriptions/'+uuid)
      setData(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    uuid && fetchData(uuid)
  }, [uuid])
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
      />
      <div className="flex gap-2 items-center">
        <Button
          type="primary"
          className="bg-slate-600 mt-2"
          onClick={handleSend}
        >
          Modifier
        </Button>
        <Button type="link" onClick={() => navigate(-1)} className="pt-2">
          Retour
        </Button>
      </div>
    </div>
  );
};

export default UpdateSubscription;
