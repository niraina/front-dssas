/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/app/rootReducer";
import { useSelector } from "react-redux";

const Accueil = () => {
  const currentUser: any = useSelector((state: RootState) => state.currentUser);

  return (
    <div className="pt-6">
      <h2 className="text-2xl">Bonjour {currentUser.name}</h2>
      <h1 className="text-[48px] font-bold">Bienvenu dans notre site,</h1>
      <p className="text-gray-700">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolorum
        neque quam exercitationem amet maxime laboriosam qui cum corporis unde
        minus, illo tempore, quis inventore alias vero mollitia dignissimos
        obcaecati.
      </p>
    </div>
  );
};

export default Accueil;
