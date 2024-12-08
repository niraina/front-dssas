import { Outlet, Route, Routes } from "react-router-dom"
import List from "./List"
import Add from "./Add";
export interface SubscriptionsTypes {
  duration:     number;
  description:  string;
  price:        number;
  label:        string;
  service_uuid: string;
  uuid:         string;
}
const Subscriptions = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Add />} />
      </Route>
    </Routes>
  )
}

export default Subscriptions