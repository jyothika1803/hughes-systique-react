import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes.jsx';
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <div>
      <SnackbarProvider>
        <AppRoutes />
      </SnackbarProvider>
    </div>
  );
}

export default App;