import { ThemeProvider } from "./theme-provider";

export { ThemeProvider }

export default function CommonProvider({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
