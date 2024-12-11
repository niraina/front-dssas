/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Field from "@/widgets/Field";
import { useEffect, useState } from "react";
import { ServicesTypes } from ".";
import { Button } from "antd";
import { api } from "@/shared/api";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [data, setData] = useState<ServicesTypes>({
    name: "",
    description: "",
    status: 0,
    type: "VIDEO",
  });
  const navigate = useNavigate();
  const { uuid } = useParams();
  const onChange = (v: any) => {
    setData((prev: any) => ({ ...prev, ...v }));
  };

  const handleSend = () => {

    if(uuid){
      try {
        const response = api.put(`/services/${uuid}`, {
          name: data.name,
          description: data.description
        });
        //WIP
        console.log(response);
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }else {
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
    }
  };

  const fetchCurrent = async (uuid: string) => {
    try {
      const response = await api.get("/services/" + uuid);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    uuid && fetchCurrent(uuid);
  }, [uuid]);
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
      {uuid ? (
        ""
      ) : (
        <>
          <label className="mt-3">Type</label>
          <Select
            style={{ width: 120 }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange({ type: e })
            }
            options={[
              { value: "VIDEO", label: "Vidéo" },
              { value: "AUDIO", label: "Audio" },
              { value: "FORMATION", label: "Formation" },
              { value: "LOGICIEL", label: "Logiciel" },
            ]}
            placeholder="Séléctionner..."
            className="block !w-full mb-3"
          />
        </>
      )}
      <div className="flex gap-2 items-center">
        <Button
          type="primary"
          className="bg-slate-600 mt-2"
          onClick={handleSend}
        >
          {uuid ? "Modifier" : "Ajouter"}
        </Button>
        <Button type="link" onClick={() => navigate(-1)} className="pt-2">
          Retour
        </Button>
      </div>
    </div>
  );
};

export default Add;
