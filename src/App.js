import {useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Contacts from "./scenes/contacts";
import Barchart from "./scenes/chart/Bar-index.jsx"
import Piechart from "./scenes/chart/pie-index.jsx"
import Bubblechart from "./scenes/chart/Bubble-index.jsx"
// import BubbleChart from "./scenes/chart/Bubble-index"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LineChart from './scenes/chart/Line-index.jsx';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  
 return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/Barchart" element={<Barchart />} />
              <Route path="/Piechart" element={<Piechart/>} />
              <Route path="/Linechart" element={<LineChart/>} />
              <Route path="/Bubblechart" element={<Bubblechart/>} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
