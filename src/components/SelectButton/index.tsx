type ButtonProps = {
  name: string,
  selected?: boolean,
  onClick?: any,
  color?: string,
  disabled?: boolean,
}


export const SelectButton = ({ name, selected = false, onClick, disabled = false }: ButtonProps) => {
  return (
    selected 
      ? <button className='bg-dark-blue text-white py-2 flex-grow rounded-3xl border-none outline-none focus:outline-none' onClick={onClick} disabled={disabled}>{name}</button> 
      : <button className={`bg-white flex-grow py-2 rounded-2xl border-none outline-none focus:outline-none`} onClick={onClick} disabled={disabled}>{name}</button>
  );
};
