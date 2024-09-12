import React, { useEffect } from 'react'
import '..//..//styles/users.css'


export default function UsersTable() {

    useEffect(() => {
        console.log(">>> check use effect");    
        getData();
    }, []);
    
    const getData = async () => {
        const res = await fetch('http://localhost:8000/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                username: "hoidanit@gmail.com",
                password: "123456"
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();


        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjZlMTNmNmQwY2VkZGMxYzc5ZjlmMzg0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MjYxMTk4MTMsImV4cCI6MTgxMjUxOTgxM30.-CcDC_05yozRxd5f9p03cphJ-gIldwZ8RaUB37oPn2c";


        const res1 = await fetch('http://localhost:8000/api/v1/users/all', {
            method: 'GET',
            
            headers: {
                "authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            }
        });
        const data1 = await res1.json();
        console.log(">>>> check data 1: ", data1); 
    }
    console.log(">>>> check render");
  return (
    <div>
        <h2>HTML Table</h2>
        <table>
        <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
        </tr>
        <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
        </tr>
        <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
        </tr>
        <tr>
            <td>Ernst Handel</td>
            <td>Roland Mendel</td>
            <td>Austria</td>
        </tr>
        <tr>
            <td>Island Trading</td>
            <td>Helen Bennett</td>
            <td>UK</td>
        </tr>
        <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
        </tr>
        <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Giovanni Rovelli</td>
            <td>Italy</td>
        </tr>
        </table>
    </div>
  )
}
