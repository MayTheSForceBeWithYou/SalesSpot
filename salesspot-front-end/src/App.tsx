import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HubspotExportPage from './pages/HubspotExportPage';
import HubspotImportPage from './pages/HubspotImportPage';
import HubspotSchemaPage from './pages/HubspotSchemaPage';
import SalesforceExportPage from './pages/SalesforceExportPage';
import SalesforceImportPage from './pages/SalesforceImportPage';
import SalesforceSchemaPage from './pages/SalesforceSchemaPage';
import LocalPage from './pages/LocalPage';
import NavBar from './components/NavBar';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/"                  element={<HomePage />} />
          <Route path="/hubspot-schema"    element={<HubspotSchemaPage />} />
          <Route path="/hubspot-import"    element={<HubspotImportPage />} />
          <Route path="/hubspot-export"    element={<HubspotExportPage />} />
          <Route path="/salesforce-schema" element={<SalesforceSchemaPage />} />
          <Route path="/salesforce-import" element={<SalesforceImportPage />} />
          <Route path="/salesforce-export" element={<SalesforceExportPage />} />
          <Route path="/local"             element={<LocalPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
