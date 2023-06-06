export type CardProps = {
  title: string;
  date: string;
  subtitle: string;
  content?: string;
  width?: number;
  height?: number;
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