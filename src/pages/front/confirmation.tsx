import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-center pt-10 mt-10 text-2xl">Votre demande est encore en attente, merci pour votre abonnement</h2>
      <div className="flex justify-center mt-5">
        <Button className="text-white bg-blue-700 my-2 mx-auto text-center" onClick={() => navigate('/front')}>Revenir à l'acceuil</Button>
      </div>
    </div>
  )
}

export default Confirmation