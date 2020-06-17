import React, { useEffect, useState } from "react";

import UsersList from "../components/usersList";
import ErrorModal from "../../shared/components/UI_Elements/ErrorModal";
import LoadingSpinner from "../../shared/components/UI_Elements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook"; 

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient(); 
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    // with fetch the default request type is a get
    const fetchUsers = async () => {
    
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users");
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

 

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    {isLoading && (
      <div className="center">
        <LoadingSpinner />
      </div>
    )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
