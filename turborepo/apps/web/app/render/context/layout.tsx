import { ReactNode } from "react";
import { NameProvider } from "./context";

export default ({ children }: { children: ReactNode }) => <NameProvider>{children}</NameProvider>