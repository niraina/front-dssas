/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button, Table } from "antd";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import moment from 'moment';

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

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {record?.status === 'active' ? ''
          :
          <Button
            type="primary"
            onClick={() => handleApproved(record?.uuid)}
            className="bg-green-600 text-white items-center"
          >
            Approuver
          </Button>
        }
          {record?.status === 'refused' ? ''
          :<Button
            type="primary"
            onClick={() => handleRefuse(record?.uuid)}
            className="bg-red-600 text-white items-center"
          >
            Refuser
          </Button>}
          <Button
            type="primary"
            onClick={() => handleAbort(record?.uuid)}
            className="bg-yellow-600 text-white items-center hidden"
          >
            Abort
          </Button>
        </div>
      ),
    },
  ];

  const handleApproved = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/approve`).then(() => {
        fetchData();
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefuse = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/refuse`).then(() => {
        fetchData();
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAbort = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/abort`).then(() => {
        fetchData();
      })
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