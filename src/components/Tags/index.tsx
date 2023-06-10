type TagProps = {
  label: string
}

// TODO: [Optional] When there are too many tags it doesn't over flow in announcment card
export const Tag = ({label}: TagProps) => <div className='bg-medium-blue text-white py-1 px-2 rounded-md text-xxs'>{label}</div>;