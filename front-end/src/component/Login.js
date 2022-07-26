import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {setToken, Connected} from "../redux/userconnection"
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

function Login(){
    const [validated, setValidated] = useState(false)
    const [message, setMessage] = useState(false)
    const { token } = useSelector((state)=>state.userconnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()

     const  handlesubmit = async (event) =>{
        const form =  event.currentTarget
        
        if(form.checkValidity() === false){
            event.preventDefault(); 
            event.stopPropagation();
            
            setValidated(true)
        }else{
            
            setValidated(false)
            event.preventDefault(); 
            event.stopPropagation();
            const username = form.formUsername.value
            const password = form.formPassword.value
            setMessage("Vérification ...")
            const response = await fetch('login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body:new URLSearchParams({
                    'username': username,
                    'password': password
                })
            })
            if(response.status === 403){
                setMessage("Mauvais Nom d'utulisateur ou Mot de Passe")
            }else if(response.status === 200){
                let parsedres = await response.json()
                let local_token = parsedres.data.token
                let id_role = parsedres.data.id_role;
                if(id_role===0){
                    dispatch(setToken(local_token))
                    dispatch(Connected())
                    setMessage("Bienvenue")
                    navigate('/')
                }else{
                    setMessage("[FORBIDDEN]")
                    setValidated(false)
                }
            }
        }
    }
    return(
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary" style={{borderRadius:"7px 7px 0px 0px"}}></div>
                    <Card className="shadow" style={{borderRadius:"0px 0px 7px 7px"}}>
                    <Card.Body id="login">
                        <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-2 text-uppercase txt-center">Agent Admin</h2>
                        <p className=" mb-5">Veuillez vous connectez</p>
                        <div className="mb-3">
                            <Form noValidate validated={validated} onSubmit={handlesubmit}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Control required type="text" placeholder="Username" />
                                </Form.Group>

                                <Form.Group
                                    className="mb-3"
                                    controlId="formPassword"
                                >
                                    <Form.Control required  type="password" placeholder="Password" />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Se Connecter
                                    </Button>
                                </div>
                            </Form>
                            <div className="mt-3">
                            <p className="mb-0  text-center text-primary">
                                {message}
                                
                            </p>
                            </div>
                        </div>
                        </div>
                    </Card.Body>
                    </Card>
                </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login;