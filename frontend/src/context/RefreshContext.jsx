import React, {createContext, useState, useContext} from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({children}) => {
  const [trigger, setTrigger] = useState(0);

  const incrementTrigger = () => setTrigger((prev) => prev + 1);

  return (
    <RefreshContext.Provider value={{trigger, incrementTrigger}}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);

