'use client'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ApiController from '@/controllers/api.controller';
import Swal from 'sweetalert2';

export default function Login(params) {

    const { register, handleSubmit, formState: { errors}, getValues} = useForm();
    const apiController = new ApiController();

    const enviarFormulario = async(data) => {
        await apiController.post(data, '/usuario/login').then(rta => {
            localStorage.setItem('token', rta.token)
            if(rta.status == 200){
                window.location.assign('/chat');
            }else if(rta.status == 400){
                Swal.fire({
                    title: rta.message,
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                })
            }
        })
    }

    return(
        <div className="text-white my-5 py-5 w-75 mx-auto text-center">
            <h5 className='my-5'>Ingresar</h5>
            <Form onSubmit={handleSubmit(enviarFormulario)}>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="correo">
                    {/* <Form.Label column sm={3}>
                    Correo
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="email" placeholder="Correo" defaultValue={'correo@correo.com'}
                            {...register("correo", {required: true})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="contrasena">
                    {/* <Form.Label column sm={3}>
                    Contraseña
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="password" placeholder="Contraseña" defaultValue={'123456'}
                            {...register("contrasena", {required: true})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="my-5">
                    <Col className='d-flex'>
                        <Button className='mx-auto' type="submit">Ingresar</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}