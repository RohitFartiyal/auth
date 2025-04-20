
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  </HelmetProvider>
);
