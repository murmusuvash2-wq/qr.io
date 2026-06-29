import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppProvider } from './contexts/AppContext';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
