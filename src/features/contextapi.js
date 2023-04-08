import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "./firebaseauth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

const Context = createContext({});
export const useContextAPI = () => useContext(Context);

export const ContextAPIProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});
  
  const usersFunc = () => {
    const dababaseRef = collection(db, "users");
    getDocs(dababaseRef)
      .then((res) => {
        const userss = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log({ userss });
        setUsers(userss);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    usersFunc();
  }, []);

  const filterUsers = (phn) => {
    users?.find((item) => item.id == phn);
  };

  const registerToCollection = (collectionName, documentName, dataObject) => {
    return setDoc(doc(db, collectionName, documentName), dataObject);
  };

  return (
    <Context.Provider
      value={{
        registerToCollection,
        users,
        setUsers,
        currentLoggedInUser,
        setCurrentLoggedInUser,
      }}>
      {children}
    </Context.Provider>
  );
};
