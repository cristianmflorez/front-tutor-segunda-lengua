'use client'
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ApiController from '@/controllers/api.controller';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

export default function Registrarme(params) {

    const apiController = new ApiController();
    const { register, handleSubmit, formState: { errors}, getValues} = useForm();

    useEffect(()=>{
        document.getElementById('fechaNacimiento').max = '2004-01-01';
    },[])
    const enviarFormulario = async(data) => {
        delete data.confirmarContrasena
        await apiController.post(data, '/usuario').then(rta => {
            if(rta.status == 200){
                Swal.fire({
                    title: rta.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#0d6efd'
                }).then(rta2 => {
                    if(rta2.isConfirmed == true && rta.status == 200){
                        window.location.assign('/login')
                    }
                })
            }else if(rta.status == 205){
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
        <div className="text-white w-75 mx-auto text-center">
            <h5 className='mt-4 mb-3'>Registrarme</h5>
            <Form onSubmit={handleSubmit(enviarFormulario)}>
                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="nombre">
                    {/* <Form.Label column sm={3}>
                    Nombre
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="text" placeholder="Nombre" 
                            {...register("nombre", {required: true})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="apellido">
                    {/* <Form.Label column sm={3}>
                    Correo
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="text" placeholder="Apellido" 
                            {...register("apellido", {required: true})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="correo">
                    {/* <Form.Label column sm={3}>
                    Correo
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="email" placeholder="Correo" 
                            {...register("correo", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                }
                            })}
                        />
                        {(errors.correo) && <p className="text-danger m-0">Debes ingresar un correo válido</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="contrasena">
                    {/* <Form.Label column sm={3}>
                    Contraseña
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="password" placeholder="Contraseña" 
                            {...register("contrasena", {required: true,
                                minLength: {
                                value: 6}})}
                        />
                        {(errors.contrasena) && <p className="text-danger m-0">La contraseña debe tener 6 caracteres como mínimo</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="confirmarContrasena">
                    {/* <Form.Label column sm={3}>
                    Confirmar contraseña
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Control type="password" placeholder="Confirmar contraseña" 
                            {...register("confirmarContrasena",  { required: true, validate: (match) => {
                                const password = getValues("contrasena")
                                return match === password || "Las contraseñas no coinciden"
                              }
                          })}
                        />
                        {(errors.confirmarContrasena?.message) && <p className="text-danger m-0">Las contraseñas no coinciden</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="justify-content-center text-start" controlId="fechaNacimiento">
                    <Col sm={9} lg={6}>
                        <Form.Label>
                            Fecha de nacimiento
                        </Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="fechaNacimiento">
                    <Col sm={9} lg={6}>
                        <Form.Control type="date"
                            {...register("fechaNacimiento", {required: true})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="idiomaNativo">
                    {/* <Form.Label column sm={3}>
                    Confirmar contraseña
                    </Form.Label> */}
                    <Col sm={9} lg={6}>
                        <Form.Select
                            {...register("idiomaNativo", {required: true})}
                        >
                            <option value="">Idioma nativo</option>
                            <option value="espanol">Español</option>
                            <option value="" disabled={true}>Portugués</option>
                            <option value="" disabled={true}>Aleman</option>
                            <option value="" disabled={true}>Frances</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col className='d-flex'>
                        <Button className='mx-auto' type="submit">Registrarme</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}