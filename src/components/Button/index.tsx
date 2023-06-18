type ButtonProps = {
  name: string,
  disabled?: boolean,
  onClick?: () => void,
  color?: string,
  rounded?: string,
  minWidth?: string,
}


export const Button = ({ name, disabled = false, onClick, color = 'bg-turquoise', rounded = 'rounded-xl', minWidth = '' }:ButtonProps) => {
  return (
    disabled 
      ? <button className={`bg-turquoise-inactive py-2 flex-grow rounded-xl border-none outline-none focus:outline-none ${minWidth}`} onClick={onClick} disabled>{name}</button> 
      : <button className={`${color} flex-grow py-2 ${rounded} border-none outline-none focus:outline-none ${minWidth}`} onClick={onClick}>{name}</button>
  );
};
