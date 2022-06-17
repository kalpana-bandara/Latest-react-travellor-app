import Header from "./components/Header";
import Hero from "./components/Hero";
import Details from "./components/Details";
import { CountryNameProvider } from "./CountryNameContext";

function App() {
  return (
    <div className="App">
      <Header />
      <CountryNameProvider>
        <Hero />
        <Details />
      </CountryNameProvider>
    </div>
  );
}

export default App;
