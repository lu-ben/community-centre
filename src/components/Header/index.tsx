import { useLocation } from 'react-router-dom';
import { ACCOUNT_TYPES, HEADER_TEXT, HEADER_TEXT_EMPLOYEE, paths } from '../../utils/enum';
import { HeaderButton } from './headerButton';
import { useUser } from '../../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';



export const Header = () => {
  const userHook = useUser();
  const location = useLocation();
  const pathname = location.pathname;
  const accountType = userHook.hookUserCookie.user?.accountType;
 
  return (
    <div className='mb-4 mt-12'>
      <div className="flex space-between">
        {pathname === '/dashboard'
          ?  (<h1 className='text-white text-left my-4 grow'>Welcome back, <u>{userHook.hookUserCookie.user?.firstName}</u>!</h1>)
          : (<h1 className='text-white text-left my-4 grow'>{accountType === ACCOUNT_TYPES.EMPLOYEE ? HEADER_TEXT_EMPLOYEE[pathname] : HEADER_TEXT[pathname]}</h1>)}
        <button className='bg-transparent	text-white bottom-0 my-4 pr-0 border-none outline-none focus:outline-none' onClick={userHook.hookHandleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="2xl"/>
        </button>
      </div>
      <div className='flex gap-2 max-w-screen-md-2'>
        <HeaderButton name="Dashboard" selected={pathname === paths.dashboard} path={paths.dashboard}></HeaderButton>
        {accountType === ACCOUNT_TYPES.CLIENT && <HeaderButton name="Registration" selected={pathname === paths.registration} path={paths.registration}></HeaderButton>}
        {accountType === ACCOUNT_TYPES.EMPLOYEE && <HeaderButton name="Manage Events" selected={pathname === paths.manage} path={paths.manage}></HeaderButton>}
        <HeaderButton name="Announcements" selected={pathname === paths.announcement} path={paths.announcement}></HeaderButton>
        <HeaderButton name="Virtual Bulletin Board" selected={pathname === paths.bulletin} path={paths.bulletin}></HeaderButton>
        {accountType === ACCOUNT_TYPES.CLIENT && <HeaderButton name="Equipment Rental" selected={pathname === paths.rental} path={paths.rental}></HeaderButton>}
        {accountType === ACCOUNT_TYPES.CLIENT && <HeaderButton name="Past Events" selected={pathname === paths.history} path={paths.history}></HeaderButton>}
        {accountType === ACCOUNT_TYPES.EMPLOYEE && <HeaderButton name="Manage Accounts" selected={pathname === paths.account} path={paths.account}></HeaderButton>}
      </div>
    </div>
  );
};