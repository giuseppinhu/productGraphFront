import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../api";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ email: "", password: "" });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .post(
        "/login",
        {
          email: userData.email,
          password: userData.password,
        },
      )
      .then((res) => {
        console.log(res);
        toast.success("Login efetuado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ocorreu um erro! \n" + error.response.data.error);
      });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 font-sans">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <div className="bg-blue-600 h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white group-hover:scale-110 transition">
              D
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              DashSale
            </span>
          </Link>
          <h2 className="text-gray-400 text-sm italic">
            "O sucesso é a soma de pequenos esforços"
          </h2>
        </div>
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              Bem-vindo de volta
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Insira suas credenciais para acessar o painel.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                E-mail
              </label>
              <input
                required
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="exemplo@dashsale.com"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Senha
                </label>
                <a href="#" className="text-xs text-blue-400 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                required
                type="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full bg-gray-950 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
              onClick={formSubmit}
            >
              Entrar na Plataforma
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{" "}
              <a href="#" className="text-blue-400 font-medium hover:underline">
                Criar agora
              </a>
            </p>
          </div>
        </div>

        {/* Footer Simples */}
        <p className="text-center text-gray-600 text-xs mt-8 italic">
          Conexão segura via SSL de 256 bits
        </p>
      </div>
    </div>
  );
};

export default Login;
