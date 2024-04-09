// import './App.css'
// import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { JobsTable } from "./components/JobsTable/JobsTable";
import { useState } from "react";

function App() {
  const [numberOfStrings] = useState(5);
  const [offset] = useState(0);
  return (
    <>
      <NextUIProvider>
        <Header />
        <JobsTable numberOfStrings={numberOfStrings} offset={offset} />
      </NextUIProvider>
    </>
  );
}

export default App;
