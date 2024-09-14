import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider, Link } from 'react-router-dom'
import App from './App.tsx'
import UsersPage from './screens/users.page.tsx'
import { TeamOutlined, FireOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './App.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {

    label: <Link to={`/`}>Home</Link>,
    key: 'home',
    icon: <FireOutlined />,
  },
  {
    label: <Link to={`/users`}> Manage Users</Link>,
    key: 'users',
    icon: <TeamOutlined />
  }
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (<Menu onClick={onClick} 
          selectedKeys={[current]}
          mode="horizontal" 
          items={items} 
        />
    );
};
const LayoutAdmin = () => {
  return(
    <div className="">
      <Header/>
      <Outlet /> 
      <footer>klhfkshjfd</footer>
    </div>
  )
}

const router = createBrowserRouter([{
    path: '/',
    // element: <App />,
    element: <LayoutAdmin />,
    
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'users',
        element: <UsersPage />
      },
    ]
  },
  {
    path: '/tracks',
    element: <div className="">manage tracks</div>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
