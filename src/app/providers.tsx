'use client';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from "recoil";


export function Providers({ children }: {children: React.ReactNode}) {
  return (
    <RecoilRoot>
      <SnackbarProvider>
        {children}
      </SnackbarProvider>
    </RecoilRoot>
  );
}