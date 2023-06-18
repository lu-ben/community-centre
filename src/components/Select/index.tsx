type SelectProps = {
  label: string;
  options?: string[];
  width?: string;
  onChange: any;
}

export const Select = ({label, options, width="w-full", onChange}: SelectProps) => (
  <div className={`pb-3 ${width}`}>
    <p className="text-left mb-2">{label}</p>
    <select onChange={onChange} className='rounded-3xl w-full py-2 px-4 bg-light-blue border-none outline-none focus:outline-none'>
      {options ? (
        options.map((value: string, index: number) => <option value={value} key={index}>{value}</option>
        )) : (
        <><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></>
      )}
    </select>
  </div>
);
