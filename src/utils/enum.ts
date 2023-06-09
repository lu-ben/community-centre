export type CardProps = {
  title: string;
  date: string;
  subtitle: string;
  content?: string;
  tall?: boolean;
  buttonDisabled?: boolean;
  typeIndex?: number;
  ageRange?: string;
  eventType?: string;
  tags?: string[];
}

export const paths = {
  login: '/',
  dashboard: '/dashboard',
  registration: '/registration',
  rental: '/rental',
  bulletin: '/bulletin',
  announcement: '/announcement',
  logout: '/logout',
}

// typeIndex === 0 is for events
// typeIndex === 1 is for equipments
export const cardButtonTypes = [
  {
    enabled: 'Register',
    disabled: 'Full'
  },
  {
    enabled: 'Reserve',
    disabled: 'Reserved',
  }
]

export const USERTYPES = {
  EMPLOYEE: 'employee',
  CLIENT: 'client',
}