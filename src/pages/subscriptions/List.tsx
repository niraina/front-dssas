/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/shared/common/Title";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { ServicesTypes } from ".";
import { api } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

type ServicesTypesLists = ServicesTypes & {
  uuid: string;
};

const List = () => {
  const [data, setData] = useState<ServicesTypesLists[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    showModal()
    console.log(id)
  };

  const columns = [
    {
      title: "Service",
      dataIndex: "service_uuid",
      key: "service_uuid",
    },
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
      title: "Prix",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: ServicesTypesLists) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {/* {record.status === 0 && 
          <Button type="primary" onClick={() => handleActived(record.uuid, record.status)} className="bg-green-600 text-white flex items-center">
            Activer
          </Button>
          }
          {record.status === 1 && 
          <Button type="primary" onClick={() => handleActived(record.uuid, record.status)} className="bg-yellow-300 text-black flex items-center">
            Suspendre
          </Button>
          } */}
          <Button type="primary" danger onClick={() => handleDelete(record.uuid)} className="bg-red-600 items-center hidden">
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const fetchdata = async () => {
    try {
      const response = await api.get("/subscriptions");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Title title="Liste des abonnements" />
      <Button
        type="primary"
        className="bg-slate-600 my-2"
        onClick={() => navigate("add")}
      >
        Ajouter
      </Button>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <Modal title="" open={isModalOpen} className="modal">
        <p className="text-2xl pt-2">Ête vous sur de vouloir supprimer</p>
        <div className="flex items-center justify-end gap-2 py-2">
          <Button className="bg-white text-black" onClick={handleCancel}>NON</Button>
          <Button className="bg-red-800 text-white" onClick={handleOk}>OUI</Button>
        </div>
      </Modal>
    </div>
  );
};

export default List;
