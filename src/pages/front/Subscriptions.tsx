/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  const {uuid} = useParams()
  const subscription = async (uuid: string) => {
    try {
      await api.post('/userSubscriptions/', {"subscription_uuid": uuid});
      fetchData(uuid);
    } catch (error) {
      console.log(error)
    }
  }
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
            onClick={() => subscription(record.uuid)}
            className="bg-gray-600 items-center"
          >
            S'abonner
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
      <Title title="Liste abonnement" />
      <Table dataSource={data} columns={columns} rowKey="uuid" />
    </div>
  );
};

export default Subscriptions;
