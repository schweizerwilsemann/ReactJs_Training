import React, { useEffect, useState } from 'react'
// import '..//..//styles/users.css';
import {Button, Table, Modal, Popconfirm  , notification, PopconfirmProps, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type, {ColumnsType} from 'antd/es/table';
import CreateUserModal from './create.user.modal';
import UpdateUserModal from './update.user.modal';
interface IUsers {

    _id: string,
    email: string,
    name: string,
    role: string
}

export default function UsersTable() {
    const [listUsers, setListUsers] = useState([]);
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [record, setRecord] = useState({});

    const accessToken = localStorage.getItem("accessToken") as string;


    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {

        const res = await fetch('http://localhost:8000/api/v1/users/all', {
            method: 'GET',
            
            headers: {
                "authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }
        });
        const d = await res.json();

        if(!d.data) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }

        setListUsers(d.data.result);
    }

    const confirm = async (user: IUsers) => {
        const res = await fetch(`http://localhost:8000/api/v1/users/${user._id}`, 
            {
                method: 'DELETE',
                headers: {
                    "authorization" : `Bearer ${accessToken}`,
                    "Content-Type" : "application/json"
                }
            }
        );
        const data = await res.json();
        if(data.data){
            notification.success({
                message: JSON.stringify(data.message)
            })
            await getData();

        }
        else{
            notification.error({
                message: JSON.stringify(data.message)
            })
        }

        
      };


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
        },
        {
            title: 'Actions',
            render: (value, record) => {
                return(
                    <div>
                        <button onClick={() => {
                            setRecord(record);
                            setIsUpdateModalOpen(true);
                            
                        }}>
                            Edit
                        </button>

                        <Popconfirm
                            title="Delete user"
                            description={`Are you sure to delete this user. name = ${record.name}?`}
                            onConfirm={() => confirm(record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{marginLeft: 20}} danger>
                                Delete
                            </Button>
                            
                        </Popconfirm>
                    </div>
                );
            }
        }

    ];

    
    return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', }}>
            <h2>Table Users</h2>
            <div style={{}}>
                <Button onClick={() =>  setIsCreateModalOpen(true)} icon={<PlusOutlined />} type={`primary`}>Add New</Button>
            </div>
        </div>
        <Table columns={columns} dataSource={listUsers} rowKey={"_id"}/>
        <CreateUserModal 
                accessToken = {accessToken}
                getData = {getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
        />
        <UpdateUserModal 
            accessToken = {accessToken}
            getData = {getData}
            isUpdateModalOpen={isUpdateModalOpen}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            record = {record}
            setRecord = {setRecord}
        />
    </div>
  )
}
