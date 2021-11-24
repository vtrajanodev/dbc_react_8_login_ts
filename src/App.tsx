import { LinkRoutes } from "./Routes";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <LinkRoutes />
    </AuthContextProvider>
  );
}

export default App;
