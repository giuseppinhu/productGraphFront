const Sidebar = () => { 
    return (
        <aside className="h-screen w-64 bg-gray-900 text-white border-r-3 border-r-gray-400 p-4 flex flex-col">
            <div className="mb-8 mt-3">
                <img src="https://placehold.co/100x100" alt="Image User" className="rounded-full block m-auto" />
                <span className="block text-nowrap text-center font-bold mt-2">Name User</span>
                <span className="block text-nowrap text-center text-sm text-gray-400">email@email.com</span>
            </div>

            <nav className="flex flex-col justify-between flex-1">
                <ul className="space-y-4">
                    <li className="bg-gray-700 hover:bg-gray-600 h-10 rounded-md flex items-center justify-center transition-colors">
                        <a href="#" className="w-full text-center">📊 Dashboard</a>
                    </li>
                    <li className="bg-gray-700 hover:bg-gray-600 h-10 rounded-md flex items-center justify-center transition-colors">
                        <a href="#" className="w-full text-center">📦 Produtos</a>
                    </li>
                    <li className="bg-gray-700 hover:bg-gray-600 h-10 rounded-md flex items-center justify-center transition-colors">
                        <a href="#" className="w-full text-center">🧾 Vendas</a>
                    </li>
                    <li className="bg-gray-700 hover:bg-gray-600 h-10 rounded-md flex items-center justify-center transition-colors">
                        <a href="#" className="w-full text-center">👥 Clientes</a>
                    </li>
                </ul>

                <ul>
                    <li className="bg-gray-700 hover:bg-gray-600 h-10 rounded-md flex items-center justify-center transition-colors">
                        <a href="#" className="w-full text-center">⚙️ Configurações</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
 