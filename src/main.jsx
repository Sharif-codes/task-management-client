import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/router.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
  
<QueryClientProvider client={queryClient}>
<DndProvider backend={HTML5Backend}>
<React.StrictMode>
<Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
  </DndProvider>
</QueryClientProvider>

</AuthProvider>
)
