import "./index.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";

import { Cabecalho } from "./components/Cabecalho";
import { Toaster } from "./components/ui/sonner";
import { BuscarPedido } from "./pages/BuscarPedido";
import { Provider } from "react-redux";
import store from "./store/store";
import { SidebarProvider } from "./components/ui/sidebar";
import { MainFooter } from "./components/MainFooter";

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Toaster />
          <Cabecalho />

          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/menu" element={<MenuPage />}></Route>
            <Route path="/buscarpedido" element={<BuscarPedido />}></Route>
          </Routes>
          <MainFooter />
        </Provider>
      </Router>
    </>
  );
}

export default App;
