import { createContext, useState } from "react";

export const Chats_data = createContext(null);

export default function Context({ children }) {
    const [chats, setChats] = useState([]);
    const [chatActual, setChatActual] = useState(null);

  
    return (
      <Chats_data.Provider value={{ chats, setChats, chatActual, setChatActual }}>
        {children}
      </Chats_data.Provider>
    );
}