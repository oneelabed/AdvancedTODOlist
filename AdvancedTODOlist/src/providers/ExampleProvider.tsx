import { createContext, useState, type ReactNode } from "react";

// Create context
const ExampleContext = createContext<any>(null);

// Create provider
function ExampleProvider({ children }: { children: ReactNode }) {
  const [something, setSomething] = useState(10);

  return (
    <ExampleContext.Provider value={{ something, setSomething }}>
      {children}
    </ExampleContext.Provider>
  );
}

// custom hook for using the context
export { ExampleProvider, ExampleContext };
