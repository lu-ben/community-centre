type TagProps = {
  label: string
}

export const Tag = ({label}: TagProps) => <div className='bg-medium-blue text-white py-1 px-2 rounded-md text-xxs'>{label}</div>;