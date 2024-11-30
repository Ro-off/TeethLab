import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { JobsTable } from "./components/JobsTable/JobsTable";
import { PriceCalculator } from "./components/PriceCalculator/PriceCalculator";

function App() {
  return (
    <>
      <NextUIProvider>
        <Header />
        <JobsTable />
        <PriceCalculator />
      </NextUIProvider>
    </>
  );
}

export default App;
