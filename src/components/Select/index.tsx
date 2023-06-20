type SelectProps = {
  label: string;
  value?: string;
  options?: string[];
  width?: string;
  onChange: any;
  disabled?: boolean;
}

export const Select = ({label, value, options, width="w-full", onChange, disabled = false}: SelectProps) => (
  <div className={`pb-3 ${width}`}>
    <p className="text-left mb-2">{label}</p>
    <select value={value} onChange={onChange} className={`rounded-3xl w-full py-2 px-4 ${disabled ? 'bg-medium-light-blue' : 'bg-light-blue'} border-none outline-none focus:outline-none`} disabled={disabled}>
      {options ? (
        options.map((value: string, index: number) => <option value={value} key={index}>{value}</option>
        )) : (
        <><option value="volvo">Volvo</option><option value="saab">Saab</option><option value="mercedes">Mercedes</option><option value="audi">Audi</option></>
      )}
    </select>
  </div>
);
