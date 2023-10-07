import "./App.css";
import DemoLogin from "./components/DemoLogin";
// import RegistrationFormWithFormik from "./components/RegistrationFormWithFormik";
import DemoRegister from "./components/DemoRegister";

function App() {
  return (
    <div className='App'>
      {/* <RegistrationFormWithFormik /> */}
      <DemoRegister />
      <DemoLogin />
    </div>
  );
}

export default App;
