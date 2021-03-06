import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import './index.js';

let id = Math.ceil(Math.random()*10000);

const App= (props) => {
     const [messages, setMessages] = useState([])
     const [uname, setUname] = useState([])
     const [input, setInput] = useState('');
     const [inputUser, setinputUser] = useState('');
     
useEffect (()=> {
  const subscribe =()=> axios.post('http://localhost:5200/subscribers',{id}).then((res)=>{
    setMessages((messages)=> messages.concat(res.data));
    setUname((uname)=> uname.concat(res.data));
    subscribe();
  })
  subscribe()

},[]) //[] to call it once 

     const handleChangeM = (e) =>{
       const{target:{value}} = e
       setInput(value)
     }

     const handleSubmit = (e) => {
       e.preventDefault();
       axios.post('http://localhost:5200/messageSubscribers',{content: input, uname:inputUser}).then(()=> setInput(''))

       } 
         
     const handleChangeU = (e) =>{
      const{target:{value}} = e
      setinputUser(value)
    }
      return(
         <div className="App">
      <header className="App-header">
      <form name="publish" id="form" onSubmit={handleSubmit}>
            <input id="content"  type="text" name="content" placeholder="Enter your message"  onChange={handleChangeM} value={input} />
            <input id="username" type="text" name="unam" placeholder="Enter your name" onChange={handleChangeU} value={inputUser} />
            <input type="submit"  />
          </form>

          <div id="content">
            <table>
              <tr>
                <td>
               {
                  messages.map(m => <h4 key={m.content}>{m.content}</h4>)
                  }
                  </td>
                  <td>
                      {uname.map(n => <h6 key={n.uname}>From: {n.uname}</h6>)}

                  </td>
                  
                 
              </tr>
            </table>
                 
                  </div>
                  <div>
                  <br></br>

          </div>
      </header>
    </div>
  );
     }


export default App;
