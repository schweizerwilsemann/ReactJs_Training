import { StrictMode, useEffect, useState } from 'react'
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
  const getData = async () => {

    const res = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          username : "hoidanit@gmail.com",
          password: "123456"
        })
    });
    const data = await res.json();
    if(data.data) {
      localStorage.setItem("accessToken", data.data.access_token)
    }

}
  useEffect(() => {
    getData();    
  }, [])
  
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
