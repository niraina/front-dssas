import { Link, useNavigate } from 'react-router-dom'
import { logo } from '../MediaPath'
import { Input } from 'antd'
import { FRONT_LINK } from '../constants/link'
import { useAuth } from '@/widgets/Authcontext'

const Navbar = () => {
  const navigate = useNavigate()
  const { logout } = useAuth();
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <nav className='bg-nav py-4 border-b-[1px] borer-[#1F4E79]'>
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-center">
            <Link to="/front">
                <img src={logo} width={200} height={100} alt='logo' className='max-w-[268px] w-full'/>
            </Link>
            <Input className='bg-[#D9D9D9] rounded-[5px] py-3 h-12 ms-2 me-10 max-w-[480px]' />
            <div>
              {FRONT_LINK.map((item: {path: string, title: string}) =>(
                <Link to={item.path} key={item.path} className='text-[#848484] px-3 text-[18px] font-bold hover:text-[#1F4E79] duration-300 ease-in-out'>{item.title}</Link>
              ))}
            </div>
            <span className='text-[#848484] px-3 text-[18px] font-bold hover:text-[#1F4E79] duration-300 ease-in-out cursor-pointer' onClick={handleLogout}>Deconnexion</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar