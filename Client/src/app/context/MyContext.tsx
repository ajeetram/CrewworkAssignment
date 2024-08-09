import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MyContextProps {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  auth: any;
  setAuth: (value: any) => void;
  callTask: boolean;
  setCallTask: (value: boolean) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [callTask, setCallTask] = useState<boolean>(false);
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
        userId: parseData.user?.userId,
      });
    }
  }, []);

  return (
    <MyContext.Provider value={{ 
      isVisible, 
      setIsVisible,
      auth,
      setAuth,
      callTask,
      setCallTask }}>
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
