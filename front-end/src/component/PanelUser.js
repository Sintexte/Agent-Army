import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useEffect } from "react"
import {PencilSquare, Trash3Fill} from "react-bootstrap-icons"

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
    
    const tabletrstyle={
        border:"1px solid rgb(198 221 255)"
    }

    return(
        <>
            <Table style={{color:"rgb(56 135 255)"}}>
                <thead>
                    <tr >
                        <th style={{paddingLeft:"30px"}}>#</th>
                        <th>Utulisateur</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Date de Naissance</th>
                        <th>Role</th>
                        <th>Sous Role</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:"white", color:"#5496f8"}}>
                    {userarray.map((data)=>(
                    <tr style={tabletrstyle}>
                        <td style={{paddingLeft:"30px", color:"rgb(185 213 255)"}}>{data.id_user}</td>
                        <td>{data.username?data.username:"_"}</td>
                        <td>{data.firstname?data.firstname:"_"}</td>
                        <td>{data.lastname?data.lastname:"_"}</td>
                        <td>{data.birthday?data.birthday:"_"}</td>
                        <td>{data.id_role?data.id_role:"_"}</td>
                        <td>{data.id_subrole?data.id_subrole:"_"}</td>
                        <td>{data.email?data.email:"_"}</td>
                        <td>
                            <div  class="userpanelbutton"><PencilSquare /></div>
                        </td>
                        <td>
                            <div  class="userpanelbutton" onClick={()=>{
                                //delete user
                                return <div style={{backgroundColor:"black"}}>test</div>
                            }}><Trash3Fill /></div>
                        </td>
                    </tr>))}
                </tbody>
            </Table>
        </>
    )
}

export default PanelUser;