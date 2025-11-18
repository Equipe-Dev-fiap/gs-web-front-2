import { useEffect, useState } from "react";
import axios from "axios";
import CardProfissional from "../components/CardProfissional";
import ModalPerfil from "../components/ModalPerfil";
import SearchBar from "../components/SearchBar";

const API_URL = "http://localhost:5001";

export default function Dashboard() {
  const [lista, setLista] = useState([]);
  const [areas, setAreas] = useState([]);
  const [termo, setTermo] = useState("");
  const [area, setArea] = useState("");
  const [skill, setSkill] = useState("");
  const [selecionado, setSelecionado] = useState(null);

  async function carregar() {
    const [p, a] = await Promise.all([
      axios.get(`${API_URL}/profissionais`),
      axios.get(`${API_URL}/areas`)
    ]);
    setLista(p.data);
    setAreas(a.data);
  }

  useEffect(() => { carregar(); }, []);

  const filtrados = lista.filter(p => {
    const q = termo.toLowerCase();
    const skillQ = skill.toLowerCase();
    const nomeCargo = `${p.nome} ${p.cargo}`.toLowerCase().includes(q);
    const areaOk = area ? p.area === area : true;
    const skillOk = skill ? (p.habilidadesTecnicas || []).some(s => s.toLowerCase().includes(skillQ)) : true;
    return nomeCargo && areaOk && skillOk;
  });

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 text-gray-900 dark:text-white-100">

      <h1 className="text-3xl font-bold mb-4">
        Profissionais <span className="text-yellow-400">ConectaPro</span>
      </h1>

      <SearchBar
        termo={termo} setTermo={setTermo}
        area={area} setArea={setArea}
        skill={skill} setSkill={setSkill}
        areas={areas}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {filtrados.map(item => (
          <CardProfissional key={item.id} item={item} onOpen={setSelecionado} />
        ))}
      </div>

      {selecionado && (
        <ModalPerfil item={selecionado} onClose={() => setSelecionado(null)} />
      )}

      {!lista.length && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-12">
          Nenhum perfil ainda. Acesse{" "}
          <a href="/perfil" className="text-yellow-500 underline">Meu Perfil</a>{" "}
          para criar o seu.
        </p>
      )}
    </div>
  );
}
