type ErrorTextProps = {
  message: string
}

export const ErrorText = ({ message }: ErrorTextProps) => <p className="text-base text-red mb-4">{message}</p>;