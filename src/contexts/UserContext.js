import { createContext } from "react";

export const UserContext = createContext({
    userData: {},
    setUserData : () => {}
});