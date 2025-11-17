export default function Sobre() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 leading-relaxed">

      <h1 className="text-3xl font-bold mb-4">
        Sobre a <span className="text-yellow-400">ConectaPro</span>
      </h1>

      <p className="text-gray-600 mb-6">
        A ConectaPro é uma plataforma criada para promover conexões profissionais de forma inclusiva,
        colaborativa e humana. Acreditamos que o futuro do trabalho depende da troca de conhecimento,
        do desenvolvimento contínuo de competências e da construção de redes que valorizem talentos.
      </p>

      <h2 className="text-xl font-semibold mb-2">Nossa Visão</h2>
      <p className="text-gray-600 mb-6">
        Ser um espaço onde profissionais de diferentes áreas possam aprender, ensinar, inspirar e crescer juntos.
      </p>

      <h2 className="text-xl font-semibold mb-2">Nossos Valores</h2>
      <ul className="list-disc ml-6 text-gray-600 space-y-2">
        <li>Colaboração acima da competição</li>
        <li>Inclusão e diversidade</li>
        <li>Aprendizado contínuo</li>
        <li>Humanização das relações de trabalho</li>
      </ul>
    </div>
  );
}