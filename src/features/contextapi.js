import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { db } from "./firebaseauth";
import { doc, setDoc } from "firebase/firestore";

const Context = createContext({});
export const useContextAPI = () => useContext(Context);

export const ContextAPIProvider = ({ children }) => {

    const registerToCollection = (collectionName, documentName, dataObject) => {
        return setDoc(doc(db, collectionName, documentName), dataObject);
    };


    const phoneNumberRegisterFunc = () => {

    }


    // const get_all_user_data = () => {
    //     const dababaseRef = collection(db, "users");
    //     getDocs(dababaseRef)
    //         .then((res) => {
    //             const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }

    return (
        <Context.Provider value={{ registerToCollection, phoneNumberRegisterFunc }}>
            {children}
        </Context.Provider>
    )
}