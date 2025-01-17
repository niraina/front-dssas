/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/shared/api";
import { Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Nombre d\'abonnements par statut',
    },
  },
};

const Accueil = () => {
  const [subscription, setSubscription] = useState<any>([]);
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const fetchData = async () => {
    try {
      const response = await api.get('/userSubscriptions');
      const activeSubscriptions = response?.data.filter((item: any) => item.status === 'active');
      setSubscription(activeSubscriptions);

      const statusCounts = response?.data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(statusCounts);
      const data = Object.values(statusCounts);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Nombre d\'abonnements',
            data,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  },[])

  const columns = [
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
      <h2 className="text-2xl">Bonjour </h2>
      <h1 className="text-[48px] font-bold">Bienvenu sur notre site,</h1>
      <h2 className="mt-5 text-2xl font-bold mb-2">Voici votre abonnement actuel</h2>
      <Table dataSource={subscription} columns={columns} rowKey="uuid" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Statistiques des abonnements</h2>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default Accueil;
