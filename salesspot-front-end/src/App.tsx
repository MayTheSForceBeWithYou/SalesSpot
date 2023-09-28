import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExportPage from './pages/ExportPage';
import ImportPage from './pages/ImportPage';
import SchemaPage from './pages/SchemaPage';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/schema" element={<SchemaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
