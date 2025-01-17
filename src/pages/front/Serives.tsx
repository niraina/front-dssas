/* eslint-disable @typescript-eslint/no-explicit-any */
import Title from "@/shared/common/Title";
import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { api } from "@/shared/api";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ServicesTypes } from "../services";
import { useNavigate } from "react-router-dom";
import moment from "moment";

type ServicesTypesLists = ServicesTypes & {
  uuid: string;
};

const List = () => {
  const [data, setData] = useState<ServicesTypesLists[]>([]);

  const navigate = useNavigate()

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
          <Button
            type="primary"
            onClick={() => navigate("/front/subscription/"+record.uuid)}
            className="bg-gray-800 text-white items-center"
          >
            Abonnement
          </Button>
        </div>
      ),
    },
  ];

  const fetchdata = async () => {
    try {
      const response = await api.get("/services/search");
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

  const [subscription, setSubscription] = useState<any>([]);
  
    const fetchData1 = async() => {
      try {
        const response = await api.get('/userSubscriptions')
        setSubscription(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      fetchData1()
    },[])
  
    const columns1 = [
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
        title: "Label",
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
        title: "Date d'abonnement",
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
      <Title title="Liste des services" />
      <div className="flex justify-end gap-2">
        <Button
          type="primary"
          className="bg-blue-600 my-2"
          onClick={exportToPDF}
        >
          Exporter PDF
        </Button>
      </div>
      <Table dataSource={data} columns={columns} rowKey="id" />
      <h2 className="mt-5 text-2xl font-bold mb-2">Liste des abonnement</h2>
      <Table dataSource={subscription} columns={columns1} rowKey="uuid" />
    </div>
  );
};

export default List;
