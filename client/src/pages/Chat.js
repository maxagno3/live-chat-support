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
          return <p key={chat.timestamp}>{chat.content}</p>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={content} />
        {writeError ? <p>{writeError}</p> : null}
        <button type="submit">Send</button>
      </form>
      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
}

export default Chat;
