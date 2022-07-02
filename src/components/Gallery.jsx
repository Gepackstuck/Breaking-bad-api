import classes from "./Gallery.module.css";
import React, { useState } from "react";
import Popup from "./Popup";

function Gallery() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [curr, setCurr] = useState();

  const usersstat = () => {
    fetch("https://www.breakingbadapi.com/api/characters/")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  React.useEffect(() => {
    if (!users.length) {
      usersstat();
    }
  });

  const clicked = (id) => {
    setCurr(users.filter((el) => el.char_id === id));
    console.log(curr);
    console.log(users);
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
                {curr.map((item) => (
                  <div key={item.char_id}>
                    <p>Имя: {item.name}</p>
                    <img
                      key={item.char_id}
                      src={item.img}
                      alt={item.name}
                      className={classes.popupImg}
                    />
                    <p>Ник: {item.nickname}</p>
                    <p>Актер: {item.portrayed}</p>
                    <p>День рождения: {item.birthday}</p>
                    <p data-google-lang="ru">Статус: {item.status}</p>
                  </div>
                ))}
              </div>
            }
            togglePopup={togglePopup}
          />
        )}
      </div>
    </div>
  );
}

export default Gallery;
