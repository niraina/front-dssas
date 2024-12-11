import { api } from "@/shared/api";
import { useEffect, useState } from "react"
export type UserSubsType = {
  subscription_uuid: string;
  user_uuid:         string;
  uuid:              string;
  service_uuid:      string;
  subscription_date: Date;
  status:            string;
}

const UserSubscription = () => {
  const [data, setData] = useState<UserSubsType[]>([])

  const fetchData = async() => {
    try {
      const response = await api.get('/userSubscriptions')
      setData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(data);
  
  return (
    <div>UserSubscription</div>
  )
}

export default UserSubscription