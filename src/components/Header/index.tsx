import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from './button';
import { paths } from '../../utils/enum';

export const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className='mb-4 mt-12'>
      <h1 className='text-white text-left my-2'>Welcome Back, User!</h1>
      <div className='flex gap-2 max-w-screen-md-2'>
        <Button name="Dashboard" selected={pathname === paths.dashboard} path={paths.dashboard}></Button>
        <Button name="Registration" selected={pathname === paths.registration} path={paths.registration}></Button>
        <Button name="Announcements" selected={pathname === paths.announcement} path={paths.announcement}></Button>
        <Button name="Virtual Bulletin" selected={pathname === paths.bulletin} path={paths.bulletin}></Button>
        <Button name="Equipment Rental" selected={pathname === paths.rental} path={paths.rental}></Button>
        <Button name="Logout" selected={pathname === paths.logout} path={paths.logout}></Button>
      </div>
    </div>
  )
}