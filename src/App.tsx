import { NextUIProvider } from "@nextui-org/react";
import { Header } from "./components/Header/Header";
import { JobsTable } from "./components/JobsTable/JobsTable";
import { AuthModal } from "./components/AuthModal/AuthModal";
// import { AuthProvider } from "./components/AuthModal/AuthProvider";
import { useAuth } from "../src/context/authContext";

function App() {
  const { userLoggedIn } = useAuth();
  console.log("User logged in:", userLoggedIn);
  return (
    <>
      <NextUIProvider className="h-[100vh]">
        <AuthModal />
        <Header />
        {userLoggedIn && <JobsTable />}
      </NextUIProvider>
    </>
  );
}

export default App;
