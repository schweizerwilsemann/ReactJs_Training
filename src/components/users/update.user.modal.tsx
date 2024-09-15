import React, {useEffect, useState} from 'react'
import {Button, Modal, Input, notification} from 'antd';


interface Iprops {
    accessToken: string,
    getData: any;
    isUpdateModalOpen: boolean,
    setIsUpdateModalOpen: (v: boolean) => void;
    record: any
    setRecord: any
}

export default function UpdateUserModal(props: Iprops) {
    const {accessToken, getData, isUpdateModalOpen, setIsUpdateModalOpen, record, setRecord} = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState("");
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if(record){
            setName(record.name || '');
            setEmail(record.email || '');
            setPassword(record.password || '');
            setAge(record.age || "");
            setRole(record.role || '');
            setGender(record.gender || '');
            setAddress(record.address || '');

        }
    }, [record])

    const handleOk =  async () => {
        const data = {
            _id: record._id,
            name, email, password, age, gender, address, role
        }
        const res = await fetch('http://localhost:8000/api/v1/users', {
            method: 'PATCH',
            
            headers: {
                "authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        });
        const d = await res.json();
        if(d.data){
            //success
            await getData();
            notification.success({
                message: "updated successfully!"
            });
            setIsUpdateModalOpen(false);
        }
        else{
            //fail
            notification.error({
                message: "Something went wrong",
                description: JSON.stringify(d.message)
            })
        }
         
    };


    const handlCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        setRecord(null)
        setName("");
        setRole("");
        setEmail("");
        setAddress("");
        setAge("");
        setGender("");
        setPassword("");
    }
    return (
    <div>
        <Modal title="Update a user" 
        open={isUpdateModalOpen} 
        onOk={handleOk} 
        onCancel={() => handlCloseCreateModal()}
        maskClosable={false}
        >
            <div className="">
                <label>Name</label>
                <Input 
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            {

            }
            <div className=""><label>Email</label><Input value={email}
                    onChange={(event) => setEmail(event.target.value)} /></div>
            <div className=""><label>Password</label><Input value={password}
                    onChange={(event) => setPassword(event.target.value)} disabled={true}/></div>
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
