import { useNavigate } from "react-router-dom"

type ButtonProps = {
  name: string,
  selected: boolean,
  path: string
}


export const Button = ({ name, selected = false, path = '/' }:ButtonProps) => {
  const navigate = useNavigate();
  return (
    selected 
      ? <button className='bg-turqoise hover:underline py-2 flex-grow rounded-xl font-bold border-none outline-none focus:outline-none' onClick={() => navigate(path)}>{name}</button> 
      : <button className='bg-white hover:bg-turqoise hover:underline flex-grow py-2 rounded-xl border-none outline-none focus:outline-none' onClick={() => navigate(path)}>{name}</button>
  )
}
