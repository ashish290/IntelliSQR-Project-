import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const clinet = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={clinet}>
    <App />
  </QueryClientProvider>
)