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
import { useSelector } from 'react-redux';
import { RootState } from '@/app/rootReducer';

export type ServicesTypeComplet = ServicesTypes & {
  uuid: string;
  user_uuid: string; 
  type: string;  // Assurez-vous que `type` est bien dans l'interface
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
      text: 'Nombre de services par type',
    },
  },
};

const DashBoard = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });
  const currentUser: any = useSelector((state: RootState) => state.currentUser);

  const fetchdata = async () => {
    try {
      const response = await api.get("/services?service_uuid=" + currentUser.uuid);
      
      // Regrouper les services par type et compter
      const typeCounts = response.data.reduce((acc: Record<string, number>, item: ServicesTypeComplet) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(typeCounts);
      const data = Object.values(typeCounts);

      setChartData({
        labels,
        datasets: [
          {
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
