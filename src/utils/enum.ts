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
  accountType?: string;
}

export type RowProps = {
  title: string;
  date: string;
  location: string;
  type?: string;
  first?: boolean;
  last?: boolean;
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

export const ACCOUNT_TYPES = {
  EMPLOYEE: 'employee',
  CLIENT: 'client',
};

export const EMPLOYEE_ROLES = {
  INSTRUCTOR: 'instructor',
  RECEPTIONIST: 'receptionist',
  MANAGER: 'manager',
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

export const HEADER_TEXT: { [key: string]: string }= {
  ['/registration']: 'Register for a class or drop-in',
  ['/rental']: 'Borrow your favourite equipment',
  ['/announcement']: 'The lastest news about your facility',
  ['/bulletin']: 'Connect with the local community',
  ['/history']: 'View & edit your event history',
};

export const API_BASE_URL = 'http://127.0.0.1:9090';
