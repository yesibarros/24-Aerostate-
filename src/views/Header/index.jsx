import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Button, PageHeader, Avatar, Image, message } from "antd";
import { FaPlane } from "react-icons/fa";

import { sendLoginRequest } from "../../state/user";

import s from "./style.module.scss";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClick = () => {
    dispatch(sendLoginRequest())
      .then((data) =>
        message.success(`Success login: welcome back ${data.name}`)
      )
      .catch((err) => message.error(`Failed login: ${err.message}`, 5));
  };

  return (
    <header>
      <PageHeader
        className={s.brand}
        avatar={{ icon: <FaPlane /> }}
        title="Aerostates"
        subTitle="Flights and state managment"
      />
      {user._id ? (
        <div className={s.user}>
          <p>Welcome {user.name}!</p>
          <Avatar src={<Image src={user.img} />} />
        </div>
      ) : (
        <Button type="primary" size="large" onClick={handleClick}>
          Login
        </Button>
      )}
    </header>
  );
}
