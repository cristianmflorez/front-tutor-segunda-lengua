import { useEffect, useState, useContext } from 'react';
import { Button, Container, Form, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { SiSololearn } from "react-icons/si";
import { Chats_data } from "@/context/context";
import ChatBox from "@/components/chats/ChatBox";
import EditarPerfil from './EditarPerfil';

export default function Header() {
    const [showChats, setShowChats] = useState(false);
    const [showPerfil, setShowPerfil] = useState(false);
    const [chatButton, setChatButton] = useState(<></>);
    const [user, setUser] = useState(false);
    const [showChatsButton, setShowChatsButton] = useState(false);
    const handleCloseChats = () => setShowChats(false);
    const handleClosePerfil = () => setShowPerfil(false);
    const handleShowChats = () => setShowChats(true);
    const handleShowPerfil = () => setShowPerfil(true);
    const { chats } = useContext(Chats_data);
    const {setChatActual} = useContext(Chats_data);


    useEffect(()=>{
        localStorage.getItem('token') ? setUser(true) : setUser(false);
        window.location.pathname == '/' ? setShowChatsButton(true) : setShowChatsButton(false);
        window.location.pathname == '/' ? 
        setChatButton(<Button variant="link" className='d-block text-decoration-none text-white' onClick={()=>{window.location.assign('/chat')}}>Chat</Button>):
        setChatButton(<Button variant="link" className={showChatsButton && user?'d-block text-decoration-none text-white':'d-block d-md-none text-decoration-none text-white'} onClick={handleShowChats}>Mis chats</Button>);
    },[])

    const cerrarSesion = () => {
        localStorage.clear();
        window.location.assign('/')
    }

    return (
        <div className='h-header bg-dark'>
            <Navbar data-bs-theme="dark" expand='md' className="mb-0 d-flex d-block border-bottom h-header">
            <Container fluid>
                <Navbar.Brand href="/" className='mx-0'><SiSololearn className='mx-2'/>Tuto</Navbar.Brand>
                <div className='d-flex flex-nowrap'>
                    {user && chatButton}
                    <div className='d-flex flex-nowrap'>
                        {!user && <Button variant="link" className='text-decoration-none text-white d-flex py-0' href="/login">
                            <p className='my-auto mx-2'>Iniciar sesión</p>
                        </Button>}
                        {!user && <Button variant="link" className='text-decoration-none text-white d-flex py-0' href="/registrarme">
                            <p className='my-auto mx-2'>Registrarme</p>
                        </Button>}
                        {user && <Button variant="link" className='text-decoration-none text-white d-flex py-0' onClick={handleShowPerfil}>
                            <p className='my-auto mx-2'>Mi cuenta</p>
                            <FaUserCircle className='fs-1 my-auto'/>
                        </Button>}
                    </div>
                </div>
                <Offcanvas className='bg-dark' show={showChats} onHide={handleCloseChats}>
                    <Offcanvas.Header className='text-white' closeButton>
                        <Offcanvas.Title>Mis chats</Offcanvas.Title>
                        <MdChat className='fs-2 mt-auto mb-1 mx-3'/>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <div className='d-flex'>
                        <Button className='mb-3 mx-auto' onClick={()=>{window.location.assign('/chat')}}>Nuevo chat</Button>
                    </div>
                    <div className="mx-0 mb-3 border rounded-5 overflow-hidden d-flex">
                        <div className="w-100">
                            <Form.Control placeholder="Buscar" className="lh-1 border-0 my-auto form-control-chat"/>
                        </div>
                    </div>
                    <div className="overflow-auto text-start h-chats d-flex flex-column">
                        {chats && chats?.sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt)).map((chat,i)=>{
                            return( 
                                <div key={i} onClick={()=>{setChatActual(chat)}}>
                                    <ChatBox chat={chat}/>
                                </div>
                            )
                        })}
                    </div>
                    </Offcanvas.Body>
                </Offcanvas>

                <Offcanvas placement='end' show={showPerfil} onHide={handleClosePerfil}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Mi cuenta</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='d-flex flex-column'>
                        <EditarPerfil/>
                        <div className='text-center mt-auto'>
                            <Button variant='danger' onClick={cerrarSesion}>Cerrar sesión</Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
            </Navbar>
        
        </div>
    );
}