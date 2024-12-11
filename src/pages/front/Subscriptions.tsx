/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { api } from "@/shared/api";
import Title from "@/shared/common/Title";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export type SubscriptionsType = {
  duration: number;
  description: string;
  price: number;
  label: string;
  service_uuid: string;
  uuid: string;
};
const Subscriptions = () => {
  const [data, setData] = useState<SubscriptionsType[]>([]);
  const {uuid} = useParams()
  
  const fetchData = async (id: string) => {
    try {
      const response = await api.get("/subscriptions?service_uuid=" + id);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    uuid && fetchData(uuid);
  }, [uuid]);

  const subscription = async (uuid: string) => {
    try {
      await api.post('/userSubscriptions/', {"subscription_uuid": uuid});
      fetchData(uuid);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="pt-6">
      <Title title="Liste abonnement" />
      <div className="flex flex-wrap gap-4">
        {data.map((item: SubscriptionsType) => (
        <div key={item.uuid} className="border-[1px] rounded-[8px] border-[#c3c3c3] p-3 w-1/3">
          <h2 className="text-[24px] font-bold text-center p-2">{item?.label}</h2>
          <p className="p-3 text-center text-[48px]">{item.price}Ar</p>
          <p className="text-gray-700 text-center">{item.description}</p>
          <div className="mx-auto my-3">
            <Button
              type="primary"
              onClick={() => subscription(item.uuid)}
              className="bg-gray-600 p-6 rounded-[15px] flex items-center justify-center w-full"
            >
              S'abonner
            </Button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
