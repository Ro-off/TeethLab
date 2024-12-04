import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { JobsTable } from "./components/JobsTable/JobsTable";

function App() {
  return (
    <>
      <NextUIProvider className="h-[100vh]">
        <Header />
        <JobsTable />
      </NextUIProvider>
    </>
  );
}

export default App;
