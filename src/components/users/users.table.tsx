import React, { useEffect, useState } from 'react'
// import '..//..//styles/users.css';
import {Button, Table, Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', }}>
            <h2>Table Users</h2>
            <div style={{}}>
                <Button onClick={showModal} icon={<PlusOutlined />} type={`primary`}>Add New</Button>
            </div>
        </div>
        <Table columns={columns} dataSource={listUsers} rowKey={"_id"}/>
      
      <Modal title="Basic Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
      </Modal>
    </div>
  )
}
