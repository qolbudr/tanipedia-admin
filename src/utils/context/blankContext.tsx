/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from 'react';

type BlankContextType = {
  error: any;
  onSetError?: (error: any) => void;
};

const blankContextDefaultValues: BlankContextType = {
  error: null,
};

export const BlankContext = createContext<BlankContextType>(
  blankContextDefaultValues
);

export function useBlankContext() {
  const context = useContext(BlankContext);
  if (context === undefined) {
    throw new Error('useBlankContext must wrapper in the provider');
  }

  return context;
}

type Props = {
  children: ReactNode;
};

export function BlankProvider({ children }: Props) {
  const [error, setError] = useState(null);

  const onSetError = (error: any) => {
    setError(error);
  };

  const value: BlankContextType = useMemo(
    () => ({
      error,
      onSetError,
    }),
    [error]
  );

  return (
    <BlankContext.Provider value={value}>{children}</BlankContext.Provider>
  );
}
