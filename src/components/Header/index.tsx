import { useLocation } from 'react-router-dom';
import { HEADER_TEXT, paths } from '../../utils/enum';
import { HeaderButton } from './headerButton';
import { useUser } from '../../hooks/useUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';



export const Header = () => {
  const userHook = useUser();
  const location = useLocation();
  const pathname = location.pathname;
 
  return (
    <div className='mb-4 mt-12'>
      <div className="flex space-between">
        {pathname === '/dashboard'
          ?  (<h1 className='text-white text-left my-4 grow'>Welcome back, <u>{userHook.hookUserCookie.user?.firstName}</u>!</h1>)
          : (<h1 className='text-white text-left my-4 grow'>{HEADER_TEXT[pathname]}</h1>)}
        <button className='bg-transparent	text-white bottom-0 my-4 pr-0 border-none outline-none focus:outline-none' onClick={userHook.hookHandleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="2xl"/>
        </button>
      </div>
      <div className='flex gap-2 max-w-screen-md-2'>
        <HeaderButton name="Dashboard" selected={pathname === paths.dashboard} path={paths.dashboard}></HeaderButton>
        <HeaderButton name="Registration" selected={pathname === paths.registration} path={paths.registration}></HeaderButton>
        <HeaderButton name="Announcements" selected={pathname === paths.announcement} path={paths.announcement}></HeaderButton>
        <HeaderButton name="Virtual Bulletin Board" selected={pathname === paths.bulletin} path={paths.bulletin}></HeaderButton>
        <HeaderButton name="Equipment Rental" selected={pathname === paths.rental} path={paths.rental}></HeaderButton>
        <HeaderButton name="Past Events" selected={pathname === paths.history} path={paths.history}></HeaderButton>
      </div>
    </div>
  );
};