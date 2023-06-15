type TextAreaProps = {
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height?: string
}

export const TextArea = ({label, value, onChange, height = ""}: TextAreaProps) => (
  <div className="pb-3 w-full">
    <div className="text-left mb-2">{label}</div>
    <textarea
      value={value}
      onChange={onChange}
      className={`bg-light-blue rounded-2xl px-4 py-2 w-full border-none outline-none focus:outline-none ${height}`}
    >
    </textarea>
  </div>
);
