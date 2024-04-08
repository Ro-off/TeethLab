// import './App.css'
// import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { JobsTable } from "./components/JobsTable/JobsTable";

function App() {

  return (
    <>
    <NextUIProvider>
      <Header />
      <JobsTable />
    </NextUIProvider>    
    </>
  
  )
}

export default App
