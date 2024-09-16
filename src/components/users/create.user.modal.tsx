import React, {useState} from 'react'
import {Button, Modal, Input, notification, Checkbox, Form, Select, InputNumber} from 'antd';
import form from 'antd/es/form';
const { Option } = Select;

interface Iprops {
    accessToken: string,
    getData: any;
    isCreateModalOpen: boolean,
    setIsCreateModalOpen: (v: boolean) => void
}

export default function CreateUserModal(props: Iprops) {
    const {accessToken, getData, isCreateModalOpen, setIsCreateModalOpen} = props;


    const [form] = Form.useForm();

    const handlCloseCreateModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    }
    

    const onGenderChange = (value: string) => {
        switch (value) {
          case 'MALE':
            break;
          case 'FEMALE':
            break;
          case 'OTHER':
            break;
          default:
        }
      };
    const onFinish =  async (values: any) => {
        const {name, email, password, age, gender, address, role} = values;
        const data = {name, email, password, age, gender, address, role}

        const res = await fetch('http://localhost:8000/api/v1/users', {
            method: 'POST',
            
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
    }
    return (
    <div>
        <Modal title="Add new users" 
            open={isCreateModalOpen} 
            onOk={() => form.submit()} 
            onCancel={() => handlCloseCreateModal()}
            maskClosable={false}

        >
            {/* <div className="">
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
                    onChange={(event) => setRole(event.target.value)} /></div> */}

        <Form
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout='vertical'
        >
            <Form.Item
                style={{marginBottom: '5px'}}
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                style={{marginBottom: '5px'}}
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input />
            </Form.Item>
            <Form.Item
                style={{marginBottom: '5px'}}
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
            </Form.Item>
            <Form.Item
                style={{marginBottom: '5px'}}
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
                >
                <InputNumber style={{width: '100%'}} />
            </Form.Item>
            <Form.Item style={{marginBottom: '5px'}} name="gender" label="Gender" rules={[{ required: true }]} >
                <Select
                    placeholder="Select a option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                    style={{cursor: 'pointer'}}

                >
                    <Option value="MALE">MALE</Option>
                    <Option value="FEMALE">FEMALE</Option>
                    <Option value="OTHER">OTHER</Option>
                </Select>
            </Form.Item>
            <Form.Item
                style={{marginBottom: '5px'}}
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
                >
                <Input />
            </Form.Item>
            <Form.Item name="role" 
                style={{marginBottom: '5px'}}
                label="Role" 
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select a option and change input text above"
                    allowClear
                    style={{cursor: 'pointer'}}

                >
                    <Option value="USER">USER</Option>
                    <Option value="ADMIN">ADMIN</Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
                >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

           
        </Form>
      </Modal>
    </div>
  )
}
