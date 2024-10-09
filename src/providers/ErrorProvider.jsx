import { createContext, useContext, useState } from "react";


const ErrorContext = createContext(null)

export function ErrorProvider({ children }) {
  const [errorMsg, setErrorMsg] = useState("")

  const displayError = (msg) => {
    setErrorMsg(msg)
  }

  return (
    <ErrorContext.Provider
      value={{
        errorMsg,
        displayError 
      }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("ErrorContext must be used within a ContextProvider")
  }
  return context
}