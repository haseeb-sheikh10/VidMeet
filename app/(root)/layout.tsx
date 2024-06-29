import ModalProvider from "@/providers/ModalProvider";
import { StreamClientProvider } from "@/providers/StreamClientProvider";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>
        <ModalProvider />
        {children}
      </StreamClientProvider>
    </main>
  );
};

export default layout;
