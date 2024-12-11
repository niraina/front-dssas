/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import UserSubscription from "./UserSubscription";
export type SubscriptionsType = {
  duration: number;
  description: string;
  price: number;
  label: string;
  service_uuid: string;
  uuid: string;
};
const Subscriptions = () => {
  const [data, setData] = useState<SubscriptionsType[]>([]);
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get("service_uuid");
  const navigate = useNavigate();
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Prix (Ariary)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Durée (jour)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: SubscriptionsType) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => navigate("/services/new-subscription/"+record.uuid)}
            className="bg-yellow-600 items-center"
          >
            Modifier
          </Button>
        </div>
      ),
    },
  ];
  const fetchData = async (id: string) => {
    try {
      const response = await api.get("/subscriptions?service_uuid=" + id);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    uuid && fetchData(uuid);
  }, [uuid]);
  return (
    <div>
      <Button
        type="link"
        onClick={() => navigate(-1)}
        className="pt-2 mb-6 flex items-center gap-1"
      >
        <ArrowLeftOutlined /> Retourner
      </Button>
      <div className="flex justify-end gap-2">
        <Button
          type="primary"
          className="bg-slate-600 my-2"
          onClick={() => navigate("/services/new-subscription?service_uuid="+uuid)}
        >
          Ajouter
        </Button>
      </div>
      <Title title="Liste abonnement" />
      <Table dataSource={data} columns={columns} rowKey="uuid" />

      <UserSubscription />
    </div>
  );
};

export default Subscriptions;
