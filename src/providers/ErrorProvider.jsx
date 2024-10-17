import { createContext, useContext, useState } from "react";


const ErrorContext = createContext(null)


/**
 * Provides state `errorMsg` and function `displayError`. React components that display
 * error messages should use the state `errorMsg`, meanwhile components that catch errors 
 * use `displayError` to inform those components.
 */
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