import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Product from "./pages/Product";

function SimplePage({ title, eyebrow, body }: { title: string; eyebrow: string; body: string }) {
  return <div className="simple-page"><a className="wordmark" href="/"><span className="wordmark-mark">⌒</span><span>gabi</span><small>SEMIJOIAS</small></a><main><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{body}</p><a href="/" className="button button-dark">Voltar para a loja</a></main></div>;
}

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/admin" component={Admin} />
    <Route path="/produto/:handle" component={Product} />
    <Route path="/colecoes"><SimplePage eyebrow="Curadoria Gabi" title="Coleções para cada momento." body="A vitrine de coleções está sendo organizada no Shopify para que cada novidade chegue com a mesma intenção da loja." /></Route>
    <Route path="/sobre"><SimplePage eyebrow="Sobre a Gabi" title="Delicadeza com presença." body="A Gabi nasceu para encontrar o ponto exato entre o essencial e o especial — semijoias para usar, combinar e guardar na memória." /></Route>
    <Route path="/contato"><SimplePage eyebrow="Atendimento" title="Vamos conversar." body="Fale com a gente pelo Instagram @gabi_semi_joias. Em breve, este espaço também terá atendimento integrado." /></Route>
    <Route path="/politicas"><SimplePage eyebrow="Cuidado em cada detalhe" title="Trocas, entregas e privacidade." body="As políticas da loja ficam disponíveis aqui com linguagem simples e transparente para você comprar com tranquilidade." /></Route>
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
