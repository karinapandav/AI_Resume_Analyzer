import "./App.css";

import Header from "./components/Header";
import ResumeForm from "./components/ResumeForm";

function App() {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <ResumeForm />
      </div>
    </div>
  );
}

export default App;