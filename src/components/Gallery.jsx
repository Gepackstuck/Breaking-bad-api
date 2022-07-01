import classes from "./Gallery.module.css";
import React, { useState } from "react";
import Popup from "./Popup";

function Gallery() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isClick, setIsClick] = useState();
  const [curr, setCurr] = useState();

  const usersstat = async () => {
    const res = await fetch(`https://www.breakingbadapi.com/api/characters/`);
    const json = await res.json();
    setUsers([json][0]);
  };
  React.useEffect(() => {
    usersstat();
  });

  const clicked = (id) => {
    setIsClick(id);
    console.log(id);
    setCurr(users.filter((el) => el.char_id === isClick));
    console.log(curr);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={classes.frame}>
        {users.map((user) => (
          <div
            key={user.char_id}
            className={classes.card}
            onClick={() => {
              togglePopup();
              clicked(user.char_id);
            }}
          >
            <img key={user.char_id} src={user.img} alt={user.name} />
            <h4>{user.name}</h4>
          </div>
        ))}
      </div>
      <div>
        {isOpen && (
          <Popup
            content={
              <div>
                {curr?.map((item) => (
                  <div>
                    <p key={item.char_id}>{item.name}</p>
                  </div>
                ))}
              </div>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
}

export default Gallery;
