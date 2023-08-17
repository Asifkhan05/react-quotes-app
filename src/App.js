import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
import About from "./About";
import Missing from "./Missing";
import { Route, Routes } from "react-router";
import EditPost from "./EditPost";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="FunBook" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">
            <Route index element={<Newpost />} />
            <Route path=":id" element={<Postpage />} />
          </Route>
          <Route path="/editpost/:id" element={<EditPost />} />

          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
