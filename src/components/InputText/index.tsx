
type TextProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({label, value, onChange}: TextProps) => (
  <div className="pb-3 w-full">
    <div>{label}</div>
      <input
        className="bg-light-blue rounded-2xl px-2 py-1 w-full"
        value={value}
        onChange={onChange}
      />
  </div>

);
