import React from "react";

import UsersList from "../components/usersList";

const Users = () => {
  const UserObj = [
    {
      id: "u1",
      name: "Chris Pupo",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-ferrari-488-pista-107-1528476280.jpg?crop=0.782xw:0.639xh;0.106xw,0.259xh&resize=1200:*",
      places: 3,
    },
    {
      id: "u2",
      name: "jimmy john",
      image:
        "https://www.wjct.org/wp-content/uploads/2017/07/jimmy-johns-logo.jpeg",
      places: 1,
    },
  ];
  return <UsersList items={UserObj} />;
};

export default Users;
