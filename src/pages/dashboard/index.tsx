/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { api } from '@/shared/api';
import { ServicesTypes } from '../services';

export type ServicesTypeComplet = ServicesTypes & {
  uuid: string;
  user_uuid: string; 
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Statistique...',
    },
  },
};

const DashBoard = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const fetchdata = async () => {
    try {
      const response = await api.get("/services");
      const userPostCounts = response.data.reduce((acc: Record<string, number>, item: ServicesTypeComplet) => {
        acc[item.user_uuid] = (acc[item.user_uuid] || 0) + 1;
        return acc;
      }, {});
      //WIP
      const labels = Object.keys(userPostCounts).map((userId) => `User ${userId}`);
      const data = Object.values(userPostCounts);

      setChartData({
        labels,
        datasets: [
          {
            //WIP
            label: 'Nombre de services',
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
    fetchdata();
  }, []); 

  return (
    <div>
      <h1 className="pt-4 text-3xl">Bienvenu</h1>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default DashBoard;
