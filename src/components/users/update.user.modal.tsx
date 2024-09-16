import React, {useEffect, useState} from 'react'
import {Button, Modal, Input, notification, Checkbox, Form, Select, InputNumber} from 'antd';
import form from 'antd/es/form';
const { Option } = Select;


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
    const [form] = Form.useForm();


    useEffect(() => {
        if(record){
            form.setFieldsValue({
                name: record.name,
                email: record.email,
                age: record.age,
                password: record.password,
                address: record.address,
                role: record.role,
                gender: record.gender
            })

        }
    }, [record])



    const onFinish =  async (values: any) => {
        const {name, email, password, age, gender, address, role} = values;

        if(record){
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

        }
    }

    const handlCloseCreateModal = () => {
        setIsUpdateModalOpen(false);
        form.resetFields();
        setRecord(null);
    }
    return (
    <div>
        <Modal title="Update a user" 
        open={isUpdateModalOpen} 
        onOk={() => form.submit()} 
        onCancel={() => handlCloseCreateModal()}
        maskClosable={false}
        >
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
                rules={[{ required: record ? false : true, message: 'Please input your password!' }]}
                >
                <Input.Password disabled={record ? true : false}/>
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
