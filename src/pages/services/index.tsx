import { Outlet, Route, Routes } from 'react-router-dom'
import List from './List'
import Add from './Add'

export interface ServicesTypes {
  name:        string;
  description: string;
  type:        "VIDEO" | "AUDIO" | "FORMATION" | "LOGICIEL";
  status:      number;
}

const Services = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Add />} />
        <Route path="/add/:uuid" element={<Add />} />
      </Route>
    </Routes>
  )
}

export default Services