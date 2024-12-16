import { useState } from 'react';
import {
  CashOutline,
  ChevronBack,
  ChevronForward,
  CodeOutline,
  HomeOutline,
  MenuOutline,
  NewspaperOutline,
  OpenOutline,
  PeopleOutline,
  Person,
} from 'react-ionicons';
import { Link, Outlet } from 'react-router-dom';

type MenuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
};

const Header = ({ menuOpen, toggleMenu }: MenuProps) => {
  return (
    <div
      className="
        w-full
        flex
        items-center
        justify-between
        h-16
        shadow-sm
        fixed
        top-0
        bg-white
        "
    >
      <div
        className="text-left xs:hidden ml-4"
        onClick={() => {
          toggleMenu();
        }}
      >
        <MenuOutline />
      </div>
      <div className="bg-[url('assets/img/gatsu-logo.png')] bg-contain bg-no-repeat bg-center w-full h-12" />
    </div>
  );
};

const Sidebar = ({ menuOpen, toggleMenu }: MenuProps) => {
  const OPTIONS = [
    {
      title: 'Home',
      icon: (
        <HomeOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/',
    },
    {
      title: 'Clients',
      icon: (
        <PeopleOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/clients',
    },
    {
      title: 'Projects',
      icon: (
        <NewspaperOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/orders',
    },
    {
      title: 'Billing',
      icon: (
        <CashOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/clients',
    },
    {
      title: 'Billing Example',
      icon: (
        <CashOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/bill-details',
    },
    {
      title: 'Team',
      icon: (
        <CodeOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/team',
    },
    {
      title: 'Log out',
      icon: (
        <OpenOutline
          style={{
            width: '18px',
            height: '18px',
          }}
          cssClasses={
            '!text-green-500 mr-2 group-hover:translate-x-2 transition-all delay-100 duration-300 '
          }
        />
      ),
      link: '/logout',
    },
  ];

  return (
    <div
      className={`
        ${menuOpen ? '  xs:w-52 ' : 'w-0 xs:w-14'}
        bg-white
        transition-all
        h-screen
        xs:py-4
        border-r
        fixed
        top-16
        left-0
      `}
    >
      <div className="p-4 w-full flex items-center border-b">
        <div
          onClick={() => {
            toggleMenu();
          }}
          className={`
          border 
          aspect-square 
          h-6 
          rounded-md 
          absolute
          z-100
          bg-white
          ${menuOpen ? 'xs:left-48' : '-left-7 xs:left-11 '}  
          cursor-pointer
          transition-all
        `}
        >
          {menuOpen ? <ChevronBack /> : <ChevronForward />}
        </div>
        <div
          className={`flex flex-col justify-center items-center bg-green-200 aspect-square rounded-full mr-2 ${
            menuOpen ? 'h-8' : 'h-4'
          } `}
        >
          <Person cssClasses={`text-green-500 ${menuOpen ? '!h-4' : '!h-2'}`} />
        </div>
        <div className={`w-full ${!menuOpen && 'hidden'} `}>
          <p className="text-sm text-slate-800 ">Carlos González</p>
          <p className="text-xs text-slate-300">cyberpolin@gmail.com</p>
        </div>
      </div>
      {OPTIONS.map((option) => (
        <Link
          to={option.link}
          key={option.title}
          className="
              flex
              items-center
              justify-start
              py-6
              xs:py-4
              hover:border-l-8
              border-green-300
              pl-4
              cursor-pointer
              text-slate-500
              xs:text-sm
              hover:bg-green-50
              group
              transition-all
            "
        >
          {option.icon}
          <p
            className={`
              ${!menuOpen ? 'opacity-0' : 'opacity-100'}
              group-hover:translate-x-2
              delay-100
              transition-all
              duration-300
            `}
          >
            {option.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

const Footer = () => {
  return <div className="mt-6 sm:mt-14">Footer</div>;
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full flex flex-col bg-slate-100 min-h-screen">
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <div
        className={`flex mt-16 ${menuOpen ? 'ml-52' : 'ml-14'} transition-all`}
      >
        <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />
        <div className="flex-grow w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
