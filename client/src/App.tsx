import Auth from "@pages/Auth";
import Home from "@pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
