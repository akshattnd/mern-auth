import { ErrorBoundary } from "./ErrorBoundary";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <ErrorBoundary>
      <div>
      <AppRoutes />
      <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}
export default App;
