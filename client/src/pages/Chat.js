import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";


function Chat() {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  useEffect(() => {
    // setReadError(null);
    db.ref("chats").on("value", (snapshot) => {
      let chats = [];
      snapshot.forEach((snap) => {
        chats.push(snap.val());
      });
      setChats(chats);
    });
  }, []);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWriteError(null);
    try {
      await db.ref("chats").push({
        content,
        timestamp: Date.now(),
        uuid: user.uid,
      });
      setContent("");
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div>
      <div className="chats">
        {chats.map((chat) => {
          console.log(chat, 'chats');
          console.log(user.uid, 'useruid', chat.uuid, 'chatuid');
          return <p key={chat.timestamp} className={'chat-bubble ' + (user.uid === chat.uuid ? "current-user" : "")} ><span >{chat.content}</span> </p>;
        })}
      </div>
      <div className='fixed-bottom'>
        <form onSubmit={handleSubmit} className='d-flex py-4 px-5 border-top align-items-center bg-white'>
          <input className='form-control bg-light border-0' onChange={handleChange} value={content} placeholder="Enter Message..." />
          {writeError ? <p>{writeError}</p> : null}
          <span className='pl-3 svg-color-purple'> <Smile /></span>
          <span className='pl-3 svg-color-purple'> <Attach /></span>
          <span className='pl-3 svg-color-purple'> <Image /></span>

          <button type="submit" className='py-3 px-3 border-0 rounded ml-3 svg-color-white'><SendIcon /></button>
        </form>
      </div>

      {/* <div>
        Login in as: <strong>{user.email}</strong>
      </div> */}
    </div>
  );
}



function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18">
      <path fillRule="evenodd"
        d="M1.592 2.712L2.38 7.25h4.87a.75.75 0 110 1.5H2.38l-.788 4.538L13.929 8 1.592 2.712zM.989 8L.064 2.68a1.341 1.341 0 011.85-1.462l13.402 5.744a1.13 1.13 0 010 2.076L1.913 14.782a1.341 1.341 0 01-1.85-1.463L.99 8z">
      </path>
    </svg>
  )
}

function Image() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M1.75 2.5a.25.25 0 00-.25.25v10.5c0 .138.112.25.25.25h.94a.76.76 0 01.03-.03l6.077-6.078a1.75 1.75 0 012.412-.06L14.5 10.31V2.75a.25.25 0 00-.25-.25H1.75zm12.5 11H4.81l5.048-5.047a.25.25 0 01.344-.009l4.298 3.889v.917a.25.25 0 01-.25.25zm1.75-.25V2.75A1.75 1.75 0 0014.25 1H1.75A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25zM5.5 6a.5.5 0 11-1 0 .5.5 0 011 0zM7 6a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
  )
}

function Smile() {
  return <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M0 0h24v24H0V0z" fill="none" /><circle cx="15.5" cy="9.5" r="1.5" /><circle cx="8.5" cy="9.5" r="1.5" /><circle cx="15.5" cy="9.5" r="1.5" /><circle cx="8.5" cy="9.5" r="1.5" /><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-2.5c2.33 0 4.32-1.45 5.12-3.5h-1.67c-.69 1.19-1.97 2-3.45 2s-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5z" /></svg>
}


function Attach() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M0 0h24v24H0z" fill="none" /><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" /></svg>
}

export default Chat;
