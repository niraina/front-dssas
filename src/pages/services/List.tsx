import Title from "@/shared/common/Title";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { ServicesTypes } from ".";
import { api } from "@/shared/api";

const List = () => {
  const [data, setData] = useState<ServicesTypes[]>([])
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const fetchdata = async() => {
    const response = await api.get('/services');
    console.log(response);
    
  }

  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <div>
      <Title title="Liste des services"/>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  )
}

export default List