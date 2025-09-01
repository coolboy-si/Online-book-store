import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Authprovidor from './context/Authprovidor'; // ✅ Correct default import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Authprovidor> {/* ✅ Wrap App with Authprovidor */}
        <div className='dark:bg-slate-900 dark:text-white'>
          <App />
        </div>
      </Authprovidor>
    </BrowserRouter>
  </StrictMode>
);
