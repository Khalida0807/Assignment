import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import ShowEpisodes from "./ShowEpisodes";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies/>}/>
        <Route path="/:id" element={<ShowEpisodes/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
