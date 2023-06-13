
type TextProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  height?: string
  width?: string
}

export const InputText = ({label, value, onChange, height = "", width = 'w-full'}: TextProps) => (
  <div className={`pb-3 ${width}`}>
    <div className="text-left mb-2">{label}</div>
    <input
      className={`bg-light-blue rounded-3xl px-4 py-1.5 w-full border-none outline-none focus:outline-none ${height}`}
      value={value}
      onChange={onChange}
    />
  </div>

);
