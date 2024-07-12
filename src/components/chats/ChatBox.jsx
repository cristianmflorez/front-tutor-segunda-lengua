import { useEffect, useState } from "react"

export default function ChatBox(params) {

    const [chat, setChat] = useState(null)

    useEffect(()=>{
        setChat(params.chat);
    },[params])
    
    return(
        <div className="bg-dark text-white border-0 border-top border-secondary mx-3 px-3 py-2">
            <p className="p-0 m-0 text-end">{chat?.createdAt.slice(0,10)}</p>
            <p className="p-0 m-0"><strong>Tú: </strong>{chat?.mensajes[chat?.mensajes.length - 2]?.parts[0].text}</p>
            <p className="p-0 m-0 text-nowrap overflow-hidden"><strong>Tutor: </strong>{chat?.mensajes[chat?.mensajes.length - 1]?.parts[0].text}</p>
        </div>
    )
}