export default function Contato() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-16">
      <div className="max-w-lg mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Entre em <span className="text-yellow-400">Contato</span>
        </h1>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 text-white"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400 text-white"
          />

          <textarea
            placeholder="Sua mensagem"
            className="w-full border border-gray-300 p-3 rounded-lg h-32 resize-none focus:border-yellow-400 focus:ring-yellow-400 text-white"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black-900 font-semibold py-3 rounded-lg transition"
          >
            Enviar Mensagem
          </button>
        </form>

      </div>
    </div>
  );
}