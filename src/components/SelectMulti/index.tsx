import ReactSelect, { StylesConfig } from 'react-select';
import { SelectOption } from '../../utils/enum';

type SelectMultiProps = {
  label?: string;
  selectedMulti?: SelectOption[];
  onChange: (value: any) => void;
  options?: any[];
  width?: string;
}

const SelectStyles: StylesConfig = {
  control: () => ({
    display: 'flex',
    backgroundColor: '#E0E3EF',
    width: '100%',
    cursor: 'pointer',
    borderRadius: '1.5rem',
    padding: '0.5rem 1rem',
  }),
};

export const SelectMulti = ({ label, selectedMulti = [], onChange, options = [], width="w-full", }: SelectMultiProps) => (
  <div className={`pb-3 ${width}`}>
    <p className="text-left mb-2">{label}</p>
    <ReactSelect
      styles={SelectStyles}
      options={options}
      onChange={onChange}
      value={selectedMulti}
      isMulti
    />
  </div>
);
