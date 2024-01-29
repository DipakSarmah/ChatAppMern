import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { AppContext, socket } from './context/appContext';
import { useState } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const [rooms,setRooms]=useState([]);
  const [currentRoom,setCurrentRoom]=useState([]);
  const [members,setMembers]=useState([]);
  const [messages,setMessages]=useState([]);
  const [privateMemberMsg,setPrivateMemberMsg]=useState({});
  const [newMessages,setNewMessages]=useState({});
  const user=useSelector(state=>state.user)
  return (
    <AppContext.Provider value={{socket,currentRoom,setCurrentRoom,members,setMembers,messages,setMessages,rooms,setRooms,privateMemberMsg,setPrivateMemberMsg,newMessages,setNewMessages}}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home/>} />
          {!user&&(
            <>
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
            </>
          )}
          <Route path='/chat' element={<Chat/>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
