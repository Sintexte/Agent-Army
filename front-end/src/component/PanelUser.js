import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useEffect } from "react"

function PanelUser(){
    const { token } = useSelector((state)=>state.userconnection)
    const [userarray, setUserarray] = useState([])

    useEffect(() => {
            fetch('getusers', {
                method: 'POST',
                headers: {'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({"token":token})
            }).then((res0)=>{
                console.log("got request answer");
                if(res0.status === 200){
                    res0.json().then((data)=>{
                        setUserarray(data.data)
                        console.log(data.data);
                    })
                }
            })
        
    }, []);
    
    return(
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom d'utulisateur</th>
                        <th>Nom</th>
                        <th>Nom Prénom</th>
                        <th>Date de Naissance</th>
                        <th>Role</th>
                        <th>Sous Role</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {userarray.map((data)=>(<tr><td>{data.id_user}</td><td>{data.username}</td><td>{data.firstname}</td><td>{data.lastname}</td><td>{data.birthday}</td><td>{data.id_role}</td><td>{data.id_subrole}</td><td>{data.email}</td><td><Button variant="success">Modify</Button><span style={{marginLeft:"2px"}}></span><Button variant="danger">X</Button></td></tr>))}
                </tbody>
            </Table>
        </>
    )
}

export default PanelUser;