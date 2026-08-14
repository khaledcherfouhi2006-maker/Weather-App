import {Search} from "./components/Search";
import {useState} from "react";
import './App.css'

function App() {
  const [city, setCity]= useState("");

  return (
    <>
      < Search city={city} setCity={setCity} />
    </>
  )
}

export default App
