import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import NotLoggedInContainer from "./components/notLoggedIn";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<NotLoggedInContainer />} />
        <Route path="/chat" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
