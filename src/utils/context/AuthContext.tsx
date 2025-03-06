import Loader from "@/pages/loader";
import { Users } from "@prisma/client";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type State = {
  user?: Users | null;
  isLoading: boolean;
};

const stateDefaultValue: State = {
  isLoading: false,
};

export const AuthLayout = createContext<State>(
  stateDefaultValue
);

export function useAuthContext() {
  const context = useContext(AuthLayout);
  if (context === undefined) {
    throw new Error('useAuthContext must wrapper in the provider');
  }

  return context;
}

type Props = {
  children: ReactNode;
};

export function AuthCtxProvider({ children }: Props) {
  const [user, setUser] = useState<Users | null>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const __nextEL = document.getElementById('__next') as HTMLDivElement;

    if (user == null) {
      const data: string | null = localStorage.getItem('user');
      if (data != null) {
        setIsLoading(true);
        const user = JSON.parse(data);
        setUser(user);
        setIsLoading(false);

        __nextEL.classList.add('wrapper');
      }
      else {
        router.replace('/auth/login');
      }
    }

    return () => {
      __nextEL.classList.remove('wrapper');
    };
  }, [])

  return <>
    <AuthLayout.Provider value={{ user: user, isLoading: isLoading }}>
      {
        isLoading ? <Loader /> :
          children
      }
    </AuthLayout.Provider>
  </>;
}