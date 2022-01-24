import Intro from "./components/Intro/Intro";
import About from "./components/About/About";
import ProductList from "./components/ProductList/ProductList";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <div className="app">
      <Intro />
      <About />
      <ProductList />
      <Contact />
    </div>
  );
};

export default App;
