import classes from "./Gallery.module.css";
import React, { useState } from "react";

function Gallery() {
  const [users, setUsers] = useState([]);
  const usersstat = async () => {
    const res = await fetch(`https://www.breakingbadapi.com/api/characters/`);
    const json = await res.json();
    setUsers([json]);
  };
  React.useEffect(() => {
    usersstat();
  });

  return (
    <div>
      {users[0]?.map((user) => (
        <div key={user.char_id}>
          <p>
            <strong>
              {user.name} ({user.nickname})
            </strong>
          </p>

          <img key={user.char_id} src={user.img} alt={user.name} />
          <p>{user.birthday}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
