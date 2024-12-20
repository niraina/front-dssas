/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button, Table } from "antd";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

const UserSubscription = () => {
  const [data, setData] = useState<any[]>([])
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get("service_uuid");

  const fetchData = async() => {
    try {
      const response = await api.get(`/services/${uuid}/user_subscriptions`)
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: "Utilisateur ID",
      dataIndex: "user_uuid",
      key: "user_uuid",
    },
    {
      title: "Subscription Uuid",
      dataIndex: "subscription_uuid",
      key: "subscription_uuid",
    },
    {
      title: "Date",
      dataIndex: "subscription_date",
      key: "subscription_date",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => handleApproved(record.user_uuid)}
            className="bg-green-600 text-white items-center"
          >
            Approuver
          </Button>
          <Button
            type="primary"
            onClick={() => handleRefuse(record.user_uuid)}
            className="bg-red-600 text-white items-center"
          >
            Refuser
          </Button>
          <Button
            type="primary"
            onClick={() => handleAbort(record.user_uuid)}
            className="bg-yellow-600 text-white items-center"
          >
            Abort
          </Button>
        </div>
      ),
    },
  ];

  const handleApproved = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/approve`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefuse = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/refuse`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAbort = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/abort`)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Title title="Liste requette de validation"/>
      <Table dataSource={data} columns={columns} rowKey="uuid" />
    </div>
  )
}

export default UserSubscription