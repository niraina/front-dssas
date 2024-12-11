/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/rootReducer";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const Show = () => {
  const currentUser: any = useSelector((state: RootState) => state.currentUser);
  
  return (
    <div className="flex flex-col gap-3">
      <Avatar size={74} icon={<UserOutlined />} />
      <div>
        <p><b>Nom et prénom: </b> {currentUser.name}</p>
        <p><b>Email: </b> {currentUser.email}</p>
        <p><b>uuid: </b> {currentUser.uuid}</p>
      </div>
    </div>
  )
}

export default Show