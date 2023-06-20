
type TextProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string;
  width?: string;
  disabled?: boolean;
}

export const InputText = ({label, value, onChange, height = "", width = 'w-full', disabled=false}: TextProps) => (
  <div className={`pb-3 ${width}`}>
    <div className="text-left mb-2">{label}</div>
    <input
      className={`rounded-3xl px-4 py-1.5 w-full border-none outline-none focus:outline-none ${height} ${disabled ? 'bg-medium-light-blue cursor-not-allowed' : 'bg-light-blue'}`}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </div>

);
