/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/rootReducer";
import { Avatar, Table } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { api } from "@/shared/api";
import { useEffect, useState } from "react";
import moment from "moment";

const Show = () => {
  const currentUser: any = useSelector((state: RootState) => state.currentUser);
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
      title: "Nom et prénom",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div>
          {record?.user?.name}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_: any, record: any) => (
        <div>
          {record?.user?.email}
        </div>
      ),
    },
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
    <>
    <div className="flex items-center gap-3">
      <Avatar size={74} icon={<UserOutlined />} />
      <div>
        <p><b>Nom et prénom: </b> {currentUser?.name}</p>
        <p><b>Email: </b> {currentUser?.email}</p>
        <p><b>uuid: </b> {currentUser?.uuid}</p>
      </div>
    </div>
      <h2 className="mt-5 text-2xl font-bold mb-2">Liste des abonnement</h2>
      <Table dataSource={subscription} columns={columns} rowKey="uuid" />
    </>
  )
}

export default Show