import { createContext, useContext, useState, type PropsWithChildren, useMemo } from "react";

type Message = { type: "error" | "success"; content: string };

const AlertMessageContext = createContext({
  message: null as null | Message,
  setMessage: (_: Message) => {
    alert("Vous devez utiliser un provider pour pouvoir utiliser useAlertMessage");
  },
});

export function AlertMessageProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<Message | null>(null);
  const value = useMemo(() => ({ message, setMessage }), [message, setMessage]);
  return <AlertMessageContext.Provider value={value}>{children}</AlertMessageContext.Provider>;
}

export const useAlertMessage = () => {
  return useContext(AlertMessageContext);
};
