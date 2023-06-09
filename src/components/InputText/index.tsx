
type TextProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({label, value, onChange}: TextProps) => (
  <div className="pb-3 w-full">
    <div className="text-left mb-2">{label}</div>
    <input
      className="bg-light-blue rounded-2xl px-4 py-1 w-full border-none outline-none focus:outline-none"
      value={value}
      onChange={onChange}
    />
  </div>

);
