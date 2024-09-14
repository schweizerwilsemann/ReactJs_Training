import React, { useEffect, useState } from 'react'
// import '..//..//styles/users.css';
import {Button, Table, Modal, Input} from 'antd';
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');



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
        const data = {
            name, email, password, age, gender, address, role
        }
        console.log(">>>check ok data: ", data);
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
      
      <Modal title="Add new users" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        maskClosable={false}
        >
            <div className="">
                <label>Name</label>
                <Input 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className=""><label>Email</label><Input value={email}
                    onChange={(event) => setEmail(event.target.value)} /></div>
            <div className=""><label>Password</label><Input value={password}
                    onChange={(event) => setPassword(event.target.value)}/></div>
            <div className=""><label >Age</label><Input value={age}
                    onChange={(event) => setAge(event.target.value)}/></div>
            <div className=""><label>Gender</label><Input value={gender}
                    onChange={(event) => setGender(event.target.value)} /></div>
            <div className=""><label >Address</label><Input value={address}
                    onChange={(event) => setAddress(event.target.value)}/></div>
            <div className=""><label >Role</label><Input value={role}
                    onChange={(event) => setRole(event.target.value)} /></div>
      </Modal>
    </div>
  )
}
