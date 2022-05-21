import { useState, createContext } from 'react';

const LoginContext = createContext(false);


export const LoginContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  
  return (
    <LoginContext.Provider value={{login, setLogin}}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginContext;