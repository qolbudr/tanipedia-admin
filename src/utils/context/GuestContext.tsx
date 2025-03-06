import Loader from "@/pages/loader";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type State = {
  isLoading: boolean;
};

const stateDefaultValue: State = {
  isLoading: false,
};

export const GuestLayout = createContext<State>(
  stateDefaultValue
);

export function useGuestLayout() {
  const context = useContext(GuestLayout);
  if (context === undefined) {
    throw new Error('useGuestLayout must wrapper in the provider');
  }

  return context;
}

type Props = {
  children: ReactNode;
};

export function GuestCtxProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data: string | null = localStorage.getItem('user');
    if (data != null) {
      router.replace('/');
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return <>
    <GuestLayout.Provider value={{ isLoading: isLoading }}>
      {
        isLoading ? <Loader /> :
          children
      }
    </GuestLayout.Provider>
  </>;
}