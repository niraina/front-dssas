/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/shared/common/Title";
import { Button, Input, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { ServicesTypes } from ".";
import { api } from "@/shared/api";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import "jspdf-autotable";

type ServicesTypesLists = ServicesTypes & {
  uuid: string;
};

const List = () => {
  const [data, setData] = useState<ServicesTypesLists[]>([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>('');
  const [status, setStatus] = useState<number>();
  const [title, setTitle] = useState<string>('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onActived = (uuid: string, status: number, title: string) => {
    showModal();
    setUuid(uuid);
    setStatus(status);
    setTitle(title)
  }


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleActived = async () => {
    try {
      if (status === 0) {
        const response = await api.patch(`/services/${uuid}/activate`)
        console.log(response);
        if (response.status === 200) {
          fetchdata();
          handleCancel()
        }
      } else {
        const response = await api.patch(`/services/${uuid}/suspend`);
        console.log(response);
        if (response.status === 200) {
          fetchdata();
          handleCancel()
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    showModal();
    console.log(id);
  };

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: ServicesTypesLists) => (
        <>
          {record.status === 0 ? "Suspendu" : "Actif"}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: ServicesTypesLists) => (
        <div style={{ display: "flex", gap: "8px" }}>
          {record.status === 0 && (
            <Button
              type="primary"
              onClick={() => onActived(record.uuid, record.status, "activé")}
              className="bg-green-600 text-white flex items-center"
            >
              Activer
            </Button>
          )}
          {record.status === 1 && (
            <Button
              type="primary"
              onClick={() => onActived(record.uuid, record.status, "suspendre")}
              className="bg-yellow-300 text-black flex items-center"
            >
              Suspendre
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => navigate("subscription?service_uuid="+record.uuid)}
            className="bg-gray-800 text-white items-center"
          >
            Abonnement
          </Button>
          <Button
            type="primary"
            onClick={() => navigate("add/"+record.uuid)}
            className="bg-yellow-600 items-center"
          >
            Modifier
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.uuid)}
            className="bg-red-600 items-center hidden"
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const fetchdata = async () => {
    try {
      const response = await api.get("/services");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const exportToPDF = () => {
    const doc: any = new jsPDF();
    doc.text("Liste des services", 10, 10);

    const tableData = data.map((item) => [
      item.name,
      item.description,
      item.type,
      item.status === 0 ? "Suspendu" : "Actif",
    ]);

    doc.autoTable({
      head: [["Nom", "Description", "Type", "Status"]],
      body: tableData,
    });

    doc.save("liste_services.pdf");
  };

  const [filteredData, setFilteredData] = useState<ServicesTypesLists[]>([]); // État pour les données filtrées
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <Title title="Liste des services" />
      <div className="flex justify-end gap-2">
        <Button
          type="primary"
          className="bg-slate-600 my-2"
          onClick={() => navigate("add")}
        >
          Ajouter
        </Button>
        <Button
          type="primary"
          className="bg-blue-600 my-2"
          onClick={exportToPDF}
        >
          Exporter PDF
        </Button>
      </div>
      <div className="w-1/3">
        <Input.Search
          placeholder="Rechercher par nom"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          style={{ marginBottom: "16px" }}
        />
      </div>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
      <Modal title="" open={isModalOpen} className="modal">
        <p className="text-2xl pt-2">Ête vous sur de vouloir {title}</p>
        <div className="flex justify-end gap-2 p-2">
          <Button className="bg-green-800 text-white" onClick={handleActived}>
              OUI
            </Button>
            <Button className="bg-red-800 text-white" onClick={handleCancel}>
            NON
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default List;
