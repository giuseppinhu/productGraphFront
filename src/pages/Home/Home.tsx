import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-950 text-white font-sans selection:bg-blue-500/30">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-12 border-b border-gray-900 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 h-8 w-8 rounded-lg flex items-center justify-center font-bold">
            D
          </div>
          <span className="text-xl font-bold tracking-tight">DashSale</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">
            Funcionalidades
          </a>
          <a href="#pricing" className="hover:text-white transition">
            Preços
          </a>
          <a href="#about" className="hover:text-white transition">
            Sobre
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium hover:text-blue-400 transition"
          >
            Entrar
          </Link>
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-sm font-bold transition shadow-lg shadow-blue-500/20"
          >
            Acessar Demo
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Efeito de luz de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            Lançamento v2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            Gerencie suas vendas com <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              inteligência real.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A plataforma de dashboard completa para acompanhar seu faturamento,
            estoque e clientes em tempo real, com design focado em alta
            performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition"
            >
              Começar Agora Gratuitamente
            </Link>
            <button className="px-8 py-4 bg-gray-900 border border-gray-800 rounded-xl font-bold text-lg hover:bg-gray-800 transition">
              Agendar Demo
            </button>
          </div>
        </div>

        {/* Mockup Preview */}
        <div className="mt-20 max-w-6xl mx-auto rounded-2xl border border-gray-800 bg-gray-900/50 p-2 shadow-2xl overflow-hidden group">
          <div className="bg-gray-950 rounded-xl overflow-hidden border border-gray-800">
            <div className="flex items-center gap-1.5 p-3 border-b border-gray-800 bg-gray-900">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=2070"
              alt="Dashboard Preview"
              className="w-full opacity-80 group-hover:opacity-100 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon="⚡"
            title="Performance Extrema"
            description="Carregamento instantâneo de dados com cache inteligente para decisões rápidas."
          />
          <FeatureCard
            icon="🔒"
            title="Segurança Bancária"
            description="Seus dados são criptografados de ponta a ponta e armazenados com redundância."
          />
          <FeatureCard
            icon="📱"
            title="Totalmente Mobile"
            description="Acesse seu painel de qualquer lugar, com experiência otimizada para smartphones."
          />
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-gray-900 text-center text-gray-500 text-sm">
        <p>© 2024 DashSale S.A. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

// --- Sub-componente Tipado ---
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition duration-300">
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default Home;
