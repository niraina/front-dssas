import { Outlet, Route, Routes } from 'react-router-dom'
import Accueil from './Accueil'
import Services from './Serives'
import Subscriptions from './subscriptions'

const Front = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/subscription/:uuid" element={<Subscriptions />} />
      </Route>
    </Routes>
  )
}

export default Front