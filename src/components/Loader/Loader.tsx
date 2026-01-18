// 1. O bloco base que faz a mágica do "brilho passando"
const ShimmerBlock = ({ className }: { className: string}) => {
  return (
    <div className={`relative overflow-hidden bg-gray-900/50 rounded-lg ${className}`}>
      {/* A onda de luz que passa */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
    </div>
  );
};

// 2. O Esqueleto da Tabela de Vendas usando os blocos
const ModernSalesSkeleton = () => {
  return (
    <div className="w-full min-h-screen space-y-6 p-6 bg-[#0A0A0A] border border-gray-900/50 shadow-2xl shadow-black/50">
      
      {/* Cabeçalho e Filtros Fake */}
      <div className="flex justify-between items-center mb-8">
        <ShimmerBlock className="h-10 w-48" /> {/* Título */}
        <div className="flex gap-3">
           <ShimmerBlock className="h-10 w-64" /> {/* Search */}
           <ShimmerBlock className="h-10 w-32" /> {/* Select */}
        </div>
      </div>
      
      {/* Cabeçalho da Tabela Fake */}
      <div className="flex items-center px-4 mb-4 opacity-70">
        <ShimmerBlock className="h-4 w-12 mr-4" />
        <ShimmerBlock className="h-4 w-1/4 mr-4" />
        <ShimmerBlock className="h-4 w-1/6 mr-4" />
        <ShimmerBlock className="h-4 w-24 mr-4" />
        <ShimmerBlock className="h-4 w-20 ml-auto" />
      </div>

      {/* Linhas da Tabela */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center p-4 rounded-xl bg-gray-900/20 border border-gray-800/50">
            {/* ID e Avatar */}
             <ShimmerBlock className="h-10 w-10 rounded-full mr-4 flex-shrink-0" />
            
            {/* Dados do Cliente */}
            <div className="flex-1 space-y-2 mr-4">
              <ShimmerBlock className="h-5 w-1/3" />
              <ShimmerBlock className="h-3 w-1/4 opacity-60" />
            </div>

             {/* Status e Valor */}
            <ShimmerBlock className="h-8 w-24 rounded-full mr-4" />
            <ShimmerBlock className="h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernSalesSkeleton;