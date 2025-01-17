import { Outlet, Route, Routes } from 'react-router-dom'
import Accueil from './Accueil'
import Services from './Serives'
import Subscriptions from './Subscriptions'
import Confirmation from './confirmation'

const Front = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/subscription/:uuid" element={<Subscriptions />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>
    </Routes>
  )
}

export default Front