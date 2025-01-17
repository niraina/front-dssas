/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import moment from 'moment';

const UserSubscription = () => {
  const [data, setData] = useState<any[]>([])
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get("service_uuid");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [approved, setApproved] = useState('');
    const [refused, setRefused] = useState('');
    const [title, setTitle] = useState<string>('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onApproved = (uuid: string) => {
    setApproved(uuid);
    setRefused("");
    showModal();
    setTitle("Ête-vous sur d'approuver?")
  }

  const onRefused = (uuid: string) => {
    setRefused(uuid);
    setApproved("");
    showModal();
    setTitle('Ête-vous sur de réfuser?')
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      title: "Abonnement",
      dataIndex: "label",
      key: "label",
      render: (_: any, record: any) => (
        <div>
          {record?.subscription?.label}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: any, record: any) => (
        <div>
          {record?.subscription?.description}
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
          {record?.status !== 'pending' ? ''
          :
          <Button
            type="primary"
            onClick={() => onApproved(record?.uuid)}
            className="bg-green-600 text-white items-center"
          >
            Approuver
          </Button>
        }
          {record?.status !== 'pending' ? ''
          :<Button
            type="primary"
            onClick={() => onRefused(record?.uuid)}
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

  const handleApproved = async () => {
    try {
      await api.patch(`/userSubscriptions/${approved}/approve`).then(() => {
        fetchData();
        handleCancel()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleRefuse = async () => {
    try {
      await api.patch(`/userSubscriptions/${refused}/refuse`).then(() => {
        fetchData();
        handleCancel()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAbort = async (uuid: string) => {
    try {
      await api.patch(`/userSubscriptions/${uuid}/abort`).then(() => {
        fetchData();
        handleCancel()
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Title title="Liste des souscriptions" />
      <Table dataSource={data} columns={columns} rowKey="uuid" />
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal-confirm"
      >
        <div className="flex justify-end gap-2 p-2">
          {approved ? (
            <Button
              className="bg-green-800 text-white"
              onClick={handleApproved}
            >
              OUI
            </Button>
          ) : (
            ""
          )}
          {refused ? (
            <Button className="bg-green-800 text-white" onClick={handleRefuse}>
              OUI
            </Button>
          ) : (
            ""
          )}
          <Button className="bg-red-800 text-white" onClick={handleCancel}>
            NON
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default UserSubscription