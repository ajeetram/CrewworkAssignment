import { createContext,useEffect, useContext, useState, ReactNode } from 'react';

interface MyContextProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    userId:"",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
        userId:parseData.user.userId,
      });
    }
    // below comment is used to prevent multiple re-rendering means need to disable dependencies
    //eslint-disable-next-line
  }, []);
  
  return (
    <MyContext.Provider value={{ isVisible, setIsVisible,auth,setAuth}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
