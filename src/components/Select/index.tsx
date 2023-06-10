import react from 'react';
import { default as ReactSelect } from 'react-select';

type SelectProps = {
  label: string;
  options?: string[];
  width?: string;
}

export const Select = ({label, options, width="w-full"}: SelectProps) => (
  <div className={`pb-3 ${width}`}>
    <p className="text-left mb-2">{label}</p>
    <select className='rounded-3xl w-full py-2 px-4 bg-light-blue border-none outline-none focus:outline-none'>
      {options ? (
        options.map((value: string) => <option value={value}>{value}</option>
        )) : (
        <><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></>
      )}
    </select>
  </div>
);
