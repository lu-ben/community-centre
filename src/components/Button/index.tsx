type ButtonProps = {
  name: string,
  disabled?: boolean,
  onClick?: () => void,
  color?: string,
  rounded?: string,
}


export const Button = ({ name, disabled = false, onClick, color = 'bg-turqoise', rounded = 'rounded-xl' }:ButtonProps) => {
  return (
    disabled 
      ? <button className='bg-turqoise-inactive py-2 flex-grow rounded-xl border-none outline-none focus:outline-none' onClick={onClick} disabled>{name}</button> 
      : <button className={`${color} flex-grow py-2 ${rounded} border-none outline-none focus:outline-none`} onClick={onClick}>{name}</button>
  );
};
