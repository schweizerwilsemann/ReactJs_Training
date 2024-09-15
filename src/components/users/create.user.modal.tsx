import React, {useState} from 'react'
import {Button, Modal, Input, notification} from 'antd';

interface Iprops {
    accessToken: string,
    getData: any;
    isCreateModalOpen: boolean,
    setIsCreateModalOpen: (v: boolean) => void
}

export default function CreateUserModal(props: Iprops) {
    const {accessToken, getData, isCreateModalOpen, setIsCreateModalOpen} = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');


    const handleOk =  async () => {
        const data = {
            name, email, password, age, gender, address, role
        }
        const res = await fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            
            headers: {
                "authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({...data})
        });
        const d = await res.json();
        if(d.data){
            //success
            await getData();
            notification.success({
                message: "Created successfully!"
            });
            setIsCreateModalOpen(false);
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
        setIsCreateModalOpen(false);
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
        <Modal title="Add new users" 
        open={isCreateModalOpen} 
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
