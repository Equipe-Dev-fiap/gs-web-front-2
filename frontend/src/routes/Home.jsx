export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Conectando <span className="text-yellow-400">talentos</span> ao futuro do trabalho.
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-2xl">
        Uma plataforma colaborativa onde profissionais podem desenvolver competências, trocar experiências
        e construir conexões reais.
      </p>

      <div className="flex gap-4 mt-8">
        <a href="/login" className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg text-gray-900 font-semibold transition">
          Entrar
        </a>

        <a href="/register" className="border border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition">
          Criar Perfil
        </a>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-10 max-w-4xl text-left">
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Networking real</h3>
          <p className="text-gray-600 text-sm">Conecte-se com profissionais de diferentes áreas.</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Crescimento contínuo</h3>
          <p className="text-gray-600 text-sm">Compartilhe habilidades, projetos e aprendizados.</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">Ambiente colaborativo</h3>
          <p className="text-gray-600 text-sm">Conhecimento coletivo para um futuro mais sustentável.</p>
        </div>
      </div>
    </div>
  );
}