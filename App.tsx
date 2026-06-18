import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Public pages
import Home from "./pages/Home";
import NossaHistoria from "./pages/NossaHistoria";
import ComoFunciona from "./pages/ComoFunciona";

// Auth pages
import LoginMae from "./pages/LoginMae";
import LoginEmpresa from "./pages/LoginEmpresa";
import CadastroMae from "./pages/CadastroMae";
import CadastroEmpresa from "./pages/CadastroEmpresa";

// Dashboard Mãe
import DashboardMae from "./pages/DashboardMae";
import VagasMae from "./pages/VagasMae";
import CapacitacaoMae from "./pages/CapacitacaoMae";
import RedeElos from "./pages/RedeElos";
import AssistenteIA from "./pages/AssistenteIA";

// Dashboard Empresa
import DashboardEmpresa from "./pages/DashboardEmpresa";

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/nossa-historia" component={NossaHistoria} />
      <Route path="/como-funciona" component={ComoFunciona} />

      {/* Auth */}
      <Route path="/login/mae" component={LoginMae} />
      <Route path="/login/empresa" component={LoginEmpresa} />
      <Route path="/cadastro/mae" component={CadastroMae} />
      <Route path="/cadastro/empresa" component={CadastroEmpresa} />

      {/* Dashboard Mãe */}
      <Route path="/mae/dashboard" component={DashboardMae} />
      <Route path="/mae/vagas" component={VagasMae} />
      <Route path="/mae/capacitacao" component={CapacitacaoMae} />
      <Route path="/mae/rede-elos" component={RedeElos} />
      <Route path="/mae/assistente" component={AssistenteIA} />

      {/* Dashboard Empresa */}
      <Route path="/empresa/dashboard" component={DashboardEmpresa} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
