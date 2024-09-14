import React, { useEffect, useState } from 'react'
// import '..//..//styles/users.css';
import { Table} from 'antd';
import type { TableProps } from 'antd';
import type, {ColumnsType} from 'antd/es/table';

interface IUsers {
    _id: string,
    email: string,
    name: string,
    role: string
}

export default function UsersTable() {
    const [listUsers, setListUsers] = useState([]);


    useEffect(() => {
        console.log(">>> check use effect");    
        getData();
    }, []);
    
    const getData = async () => {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZlMTNmNmQwY2VkZGMxYzc5ZjlmMzg0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjYyOTQ0MDUsImV4cCI6MTgxMjY5NDQwNX0.sHNc79YauulOx-fk6PD4GEVxCQie8zxBMGQWr6a6IM8";


        const res = await fetch('http://localhost:8000/api/v1/users/all', {
            method: 'GET',
            
            headers: {
                "authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();
        setListUsers(data.data.result);
    }
    console.log(">>>> check render list users: ", listUsers);

    const columns : ColumnsType<IUsers> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render: (value, record) => {
                return(
                    <a href="">{record.email}</a>
                );
            }
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        }

    ];

    return (
    <div>
        <h2>Table Users</h2>
        <Table columns={columns} dataSource={listUsers}/>
      
        {/* <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Role</td>
                    </tr>
                </thead>
            <tbody>
                {
                    listUsers.map((item: IUsers) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.email}</td>
                                <td>{item.name}</td>
                                <td>{item.role}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </table> */}
    </div>
  )
}
