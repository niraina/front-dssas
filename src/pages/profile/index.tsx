import { Outlet, Route, Routes } from "react-router-dom"
import Show from "./Show"

const Profile = () => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<Show />} />
      </Route>
    </Routes>
  )
}

export default Profile