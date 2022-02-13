import "./App.css";
import { Routes, Route } from "react-router-dom";

import HolidayTable from "./components/HolidayTable";
import NewHolidayForm from "./components/NewHolidayForm";
import HolidayDetails from "./components/HolidayDetails";
import EditHolidayForm from "./components/EditHolidayForm";

function App() {
  return (
    <div className="App">
      <h1>Holiday MERN App</h1>
      <Routes>
        <Route path="/" element={<HolidayTable />} />
        <Route path="/holidays/:id" element={<HolidayDetails />} />
        <Route path="/holidays/:id/edit" element={<EditHolidayForm />} />
        <Route path="/holidays/new" element={<NewHolidayForm />} />
      </Routes>
    </div>
  );
}

export default App;
