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
  bulletin?: boolean;
  userType?: string;
}

export const paths = {
  login: '/',
  signup: '/signup',
  dashboard: '/dashboard',
  registration: '/registration',
  rental: '/rental',
  bulletin: '/bulletin',
  announcement: '/announcement',
  logout: '/logout',
  history: '/history',
};

// typeIndex === 0 is for events
// typeIndex === 1 is for equipments
// typeIndex === 2 is for bulletin posts
export const cardButtonTypes = [
  {
    enabled: 'Register',
    disabled: 'Full'
  },
  {
    enabled: 'Reserve',
    disabled: 'Reserved',
  },
  {
    enabled: 'Approve',
    disabled: 'Approved',
  }
];

export const USERTYPES = {
  EMPLOYEE: 'employee',
  CLIENT: 'client',
};

export const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    width: '600px',
    border: 'none',
    borderRadius: '1.25rem',
  },
  overlay: {
    backgroundColor: 'rgba(70, 70, 70, 0.50)',
  },
};

export const HEADER_TEXT = {
  ['/dashboard']: `Welcome back, user!`,
  ['/registration']: 'Register for a class or drop-in',
  ['/rental']: 'Borrow your favourite equipment',
  ['/announcement']: 'The lastest news',
  ['/bulletin']: 'Connect with the community',
  ['/history']: 'Your pass sessions',
};

export const API_BASE_URL = 'http://127.0.0.1:9090';