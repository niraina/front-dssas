/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/shared/api";
import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const Accueil = () => {
  const [subscription, setSubscription] = useState<any>([]);

  const fetchData = async() => {
    try {
      const response = await api.get('/userSubscriptions')
      setSubscription(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

  const columns = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_: any, record: any) => (
        <div>
          {record?.subscription?.service?.name}
        </div>
      ),
    },
    {
      title: "Prix (Ariary)",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: any) => (
        <div>
          {record?.subscription?.price}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "subscription_date",
      key: "subscription_date",
      render: (_: any, record: any) => (
        <div>
          {record?.subscription_date && moment(record?.subscription_date).format('DD/MM/YYYY')}
        </div>
      ),
    },

  ];

  return (
    <div className="pt-6">
      <h2 className="text-2xl">Bonjour </h2>
      <h1 className="text-[48px] font-bold">Bienvenu sur notre site,</h1>
      <h2 className="mt-5 text-2xl font-bold mb-2">Voici votre abonnement actuel</h2>
      <Table dataSource={subscription} columns={columns} rowKey="uuid" />
    </div>
  );
};

export default Accueil;
