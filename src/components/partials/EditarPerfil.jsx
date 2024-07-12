import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ApiController from '@/controllers/api.controller';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

export default function EditarPerfil(params) {

    const { register, handleSubmit, formState: { errors}, getValues, setValue} = useForm();
    const [usuario, setUsuario] = useState(null);
    const apiController = new ApiController();

    useEffect(()=>{
        apiController.get('/usuario').then(rta => {
            setUsuario(rta.data);
            setValue('nombre', rta.data.nombre)
            setValue('apellido', rta.data.apellido)
            setValue('fechaNacimiento', rta.data.fechaNacimiento?.slice(0,10))
        })

        document.getElementById('fechaNacimiento').max = '2004-01-01';
    },[])

    const submit = async(data) => {
        delete data.confirmarContrasena;
        data.nuevaContrasena.length == 0 && delete data.nuevaContrasena

        await apiController.patch(data, '/usuario').then(rta => {
            Swal.fire({
                title: rta.message,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d6efd'
            }).then(rta2 => {
                if(rta2.isConfirmed == true && rta.status == 200){
                    window.location.reload();
                }
            })

        })
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="nombre">
                    {/* <Form.Label column sm={3}>
                    Nombre
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Control type="text" placeholder="Nombre" defaultValue={usuario?.nombre}
                            {...register("nombre", {required: false, value: usuario?.nombre})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="apellido">
                    {/* <Form.Label column sm={3}>
                    Correo
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Control type="text" placeholder="Apellido"  defaultValue={usuario?.apellido}
                            {...register("apellido", {required: false, value: usuario?.apellido})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="justify-content-center text-start" controlId="fechaNacimiento">
                    <Col sm={12}>
                        <Form.Label>
                            Fecha de nacimiento
                        </Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="fechaNacimiento">
                    <Col sm={12}>
                        <Form.Control type="date"  defaultValue={usuario?.fechaNacimiento?.slice(0,10)}
                            {...register("fechaNacimiento", {required: true , value: usuario?.fechaNacimiento?.slice(0,10)})}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="idiomaNativo">
                    {/* <Form.Label column sm={3}>
                    Confirmar contraseña
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Select  value={usuario?.idiomaNativo}
                            {...register("idiomaNativo", {required: false, value: usuario?.idiomaNativo})}
                        >
                            <option value="espanol">Español</option>
                            <option value="" disabled={true}>Portugués</option>
                            <option value="" disabled={true}>Aleman</option>
                            <option value="" disabled={true}>Frances</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="contrasena">
                    {/* <Form.Label column sm={3}>
                    Contraseña
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Control type="password" placeholder="Contraseña" 
                            {...register("contrasena", {required: true})}
                        />
                        {(errors.contrasena) && <p className="text-danger m-0 mx-1">Debes ingresar la contraseña actual</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 justify-content-center" controlId="nuevaContrasena">
                    {/* <Form.Label column sm={3}>
                    Contraseña
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Control type="password" placeholder="Nueva contraseña" 
                            {...register("nuevaContrasena", {required: false,
                                minLength: {
                                value: 6}})}
                        />
                        {(errors.nuevaContrasena) && <p className="text-danger m-0 mx-1">La contraseña debe tener 6 caracteres como mínimo</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2 justify-content-center" controlId="confirmarContrasena">
                    {/* <Form.Label column sm={3}>
                    Confirmar contraseña
                    </Form.Label> */}
                    <Col sm={12}>
                        <Form.Control type="password" placeholder="Confirmar contraseña" 
                            {...register("confirmarContrasena",  { required: false, validate: (match) => {
                                const password = getValues("nuevaContrasena")
                                if(password.length > 0){
                                    return match === password || "Las contraseñas no coinciden"
                                }
                              }
                          })}
                        />
                        {(errors.confirmarContrasena?.message) && <p className="text-danger m-0 mx-1">Las contraseñas no coinciden</p>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Col className='d-flex'>
                        <Button className='mx-auto my-2' type="submit">Editar información</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}