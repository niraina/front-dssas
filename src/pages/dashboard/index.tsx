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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        const userPostCounts = posts.reduce((acc: Record<number, number>, post: any) => {
          acc[post.userId] = (acc[post.userId] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(userPostCounts).map((userId) => `User ${userId}`);
        const data = Object.values(userPostCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Posts',
              data,
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="pt-4 text-3xl">Bienvenu</h1>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default DashBoard;
