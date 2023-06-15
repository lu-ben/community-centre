type ErrorTextProps = {
  message: string
  color?: string
}

export const ErrorText = ({ message, color = 'text-red'}: ErrorTextProps) => <p className={`text-base ${color} mb-4`}>{message}</p>;