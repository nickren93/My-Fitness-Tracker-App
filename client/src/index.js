import "./index.css";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './components/routes';
import './styles/global.css';

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
