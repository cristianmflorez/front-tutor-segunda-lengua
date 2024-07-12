'use client'
import { Button, Col, Row } from 'react-bootstrap';

export default function Home() {
  return( 
    <div className='d-flex flex-column justify-coontent-between'>
      <Row xs={1} className='d-flex justify-content-end g-0'>
        <Col xs={11} md={9} xl={7} className='w-md-50 my-4 d-flex flex-column text-end me-3 text-white'>
          <h1 class="display-2 fw-semibold mb-4">¡Bienvenido a Tuto!</h1>
          <p className='fs-5 bg-secondary bg-opacity-50 pe-4 py-3'>
          La nueva plataforma educativa, donde el aprendizaje del inglés se convierte en una 
          experiencia interactiva y personalizada. Aquí en Tuto, nuestro tutor virtual está listo para 
          acompañarte en cada paso de tu viaje hacia la fluidez en inglés. Ya sea que estés buscando mejorar 
          tu gramática, ampliar tu vocabulario o simplemente practicar conversaciones, ¡estamos aquí para 
          ayudarte! Sumérgete en un mundo de aprendizaje dinámico y descubre cómo puedes dominar el idioma 
          inglés de manera eficiente y divertida. ¡Comencemos esta emocionante aventura juntos!
          </p>
        </Col>
      </Row>
      <div className='bg-dark text-white text-center fixed-bottom'>
        <p className='my-2'>By <a href="https://www.linkedin.com/in/cristianmflorez/" target="_blank" className='text-decoration-none'>Cristian Florez</a></p>
      </div>
    </div>
   )
}
