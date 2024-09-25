import type { Metadata } from "next";
import './global.css';
import { DialogWrapper } from "../components/dialogWrapper";

export const metadata: Metadata = {
  title: 'view-demo',
  description: 'view-demo',
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-bg.main w-screen h-screen`}
      >
        <DialogWrapper>
          {children}
        </DialogWrapper>
      </body>
    </html>
  );
}
