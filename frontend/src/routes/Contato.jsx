export default function Contato() {
  return (
    <div className="max-w-lg mx-auto py-16 px-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Entre em <span className="text-yellow-400">Contato</span>
      </h1>

      <form className="space-y-5">
        <input
          type="text"
          placeholder="Seu nome"
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
        />

        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full border border-gray-300 p-3 rounded-lg focus:border-yellow-400 focus:ring-yellow-400"
        />

        <textarea
          placeholder="Sua mensagem"
          className="w-full border border-gray-300 p-3 rounded-lg h-32 resize-none focus:border-yellow-400 focus:ring-yellow-400"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}