export type CardProps = {
  title: string;
  date: string;
  subtitle: string;
  content?: string;
  tall?: boolean;
  disabled?: boolean;
  typeIndex?: number;
  age?: string;
  type?: string;
  tags?: string[];
  hasEmployeeButtons?: boolean;
  accountType?: string;
  onClick?: any;
  deleteOnClick?: any;
  id?: number;
  customButtonText?: string;
  buttonMinWidth?: string;
}

export type RowProps = {
  title?: string;
  date?: string;
  facility_name?: string;
  event_type?: string;
  age_range?: string;
  first?: boolean;
  last?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
  role?: string;
  age?: number;
  account_type?: string;
  numColumns?: number;
  textSize?: string;
  button?: boolean;
  buttonOnChange?: any;
  tall?: boolean;
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
  manage: '/manage',
  account: 'account',
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
  },
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
  ['/history']: 'View your event history',
  ['/manage']: 'Create or edit events',
};

export const HEADER_TEXT_EMPLOYEE: { [key: string]: string }= {
  ['/announcement']: 'View & create facility announcements',
  ['/bulletin']: 'Manage the virtual bulletin board',
  ['/manage']: 'Manage events & view statistics',
  ['/account']: 'View all user accounts',
};

export const API_BASE_URL = 'http://127.0.0.1:9090';

export const DATE_FORMATTER = (date: string) => new Date(date).toLocaleDateString('en-US', {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export type SelectOption = {
  label: string;
  value: string;
};

export const POST_SUCCESS_MESSAGE = (name: string, action: string, submission?: boolean) => `Post "${name}" has been ${action}${(submission && ' successfully and is awaiting approval') || ''}!`;
export const REGISTRATION_SUCCESS_MESSAGE = (activity: string, date: string) => `Registration for ${activity} on ${date} was successful!`;
export const ANNOUNCEMENT_SUCCESS_MESSAGE = (name: string) => `Success! Announcement "${name}" has been created!`;
export const EQUIPMENT_SUCCESS_MESSAGE = (id: number, name: string) => `Success! "${id} - ${name}" has been reserved!`;
export const EVENT_SUCCESS_MESSAGE = (name: string) => `Event "${name}" has been deleted!`;
export const USER_UPDATE_SUCCESS_MESSAGE = (username: string) => `Successfully updated user ${username}!`;
export const SIGNUP_SUCCESS_MESSAGE = 'Your account has been created!';
export const FAIL_MESSAGE = 'Oh no! Something went wrong! Please try again';

export const EVENT_PROP_VALUES = {
  DROP_IN: 'drop-in',
  PROGRAM: 'program',
  CHILD: 'child',
  YOUTH: 'youth',
  ADULT: 'adult',
};
