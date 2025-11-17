import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

// opções padrão
const cargosBase = [
  "Engenheiro de Software","Desenvolvedor Frontend","Desenvolvedor Backend",
  "Cientista de Dados","Analista de Dados","UX/UI Designer",
  "Enfermeiro","Professor","Administrador","Atendente","Gerente"
];

const areasBase = [
  "Tecnologia","Saúde","Educação","Engenharia","Marketing","Vendas",
  "Finanças","Design","Recursos Humanos"
];

const habilidadesTecnicasOpcoes = [
  "Python","JavaScript","SQL","React","Node.js","Excel","AutoCAD",
  "Power BI","Figma","Photoshop"
];

const softSkillsOpcoes = [
  "Comunicação","Trabalho em equipe","Organização","Resiliência",
  "Liderança","Criatividade","Proatividade"
];

const vazio = (email) => ({
  id: null,
  email,
  nome: "",
  foto: "",
  cargo: "",
  resumo: "",
  localizacao: "",
  area: "",
  habilidadesTecnicas: [],
  softSkills: [],
  experiencias: [],
  formacao: [],
  projetos: [],
  certificacoes: [],
  idiomas: [],
  areaInteresses: [],
});

export default function EditarPerfil() {
  const navigate = useNavigate();
  const email = localStorage.getItem("usuarioEmail");
  const [perfil, setPerfil] = useState(vazio(email));
  const [loading, setLoading] = useState(true);

  const [cargos, setCargos] = useState([...cargosBase]);
  const [areas, setAreas] = useState([...areasBase]);
  const [novaHab, setNovaHab] = useState("");
  const [novaSoft, setNovaSoft] = useState("");
  const [mostrarOutroCargo, setMostrarOutroCargo] = useState(false);
  const [mostrarOutraArea, setMostrarOutraArea] = useState(false);
  const [outroCargo, setOutroCargo] = useState("");
  const [outraArea, setOutraArea] = useState("");

  // ===== ADIÇÕES: estados para os três novos blocos =====
  const [novaCert, setNovaCert] = useState("");
  const [novoIdioma, setNovoIdioma] = useState({ idioma: "", nivel: "" });
  const [novaAreaInteresse, setNovaAreaInteresse] = useState("");

  const up = (k, v) => setPerfil({ ...perfil, [k]: v });
  const addItem = (k, obj) => up(k, [...(perfil[k] || []), obj]);
  const delItem = (k, i) => up(k, perfil[k].filter((_, x) => x !== i));

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get(`${API_URL}/profissionais?email=${email}`);
        if (data.length) setPerfil(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [email]);

  // ======== SALVAR ========
  async function salvar() {
    try {
      const data = perfil.id
        ? await axios.put(`${API_URL}/profissionais/${perfil.id}`, perfil)
        : await axios.post(`${API_URL}/profissionais`, perfil);

      alert("✅ Perfil salvo com sucesso!");
      navigate("/perfil");
    } catch {
      alert("❌ Erro ao salvar perfil!");
    }
  }

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  // ======== HANDLERS ========
  function handleOutroCargo() {
    if (outroCargo.trim()) {
      setCargos((prev) => [...prev, outroCargo.trim()]);
      up("cargo", outroCargo.trim());
      setMostrarOutroCargo(false);
      setOutroCargo("");
    }
  }
  function handleOutraArea() {
    if (outraArea.trim()) {
      setAreas((prev) => [...prev, outraArea.trim()]);
      up("area", outraArea.trim());
      setMostrarOutraArea(false);
      setOutraArea("");
    }
  }

  // evita delay com imutabilidade
  const updateNested = (key, i, field, value) => {
    up(key, perfil[key].map((item, idx) => (idx === i ? { ...item, [field]: value } : item)));
  };

  // ===== ADIÇÕES: handlers dos novos blocos =====
  const addCert = () => {
    if (!novaCert.trim()) return;
    up("certificacoes", [...(perfil.certificacoes || []), novaCert.trim()]);
    setNovaCert("");
  };
  const removeCert = (i) => delItem("certificacoes", i);

  const addIdioma = () => {
    const { idioma, nivel } = novoIdioma;
    if (!idioma.trim() || !nivel.trim()) return;
    up("idiomas", [...(perfil.idiomas || []), { idioma: idioma.trim(), nivel: nivel.trim() }]);
    setNovoIdioma({ idioma: "", nivel: "" });
  };
  const removeIdioma = (i) => delItem("idiomas", i);

  const addAreaInteresse = () => {
    if (!novaAreaInteresse.trim()) return;
    up("areaInteresses", [...(perfil.areaInteresses || []), novaAreaInteresse.trim()]);
    setNovaAreaInteresse("");
  };
  const removeAreaInteresse = (i) => delItem("areaInteresses", i);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">
        Editar <span className="text-yellow-400">Perfil</span>
      </h1>

      {/* INFORMAÇÕES BÁSICAS */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-lg">Informações Básicas</h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* FOTO */}
          <div>
            {perfil.foto ? (
              <img src={perfil.foto} alt="foto" className="w-32 h-32 rounded-lg object-cover border shadow" />
            ) : (
              <div className="w-32 h-32 rounded-lg border bg-gray-100 flex items-center justify-center text-gray-400">Sem foto</div>
            )}
            <label className="cursor-pointer mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded inline-block">
              Escolher Foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const r = new FileReader();
                  r.onloadend = () => up("foto", r.result);
                  r.readAsDataURL(f);
                }}
              />
            </label>
          </div>

          {/* CAMPOS */}
          <div className="flex-1 space-y-3">
            <input className="border p-3 rounded w-full" placeholder="Nome completo" value={perfil.nome} onChange={(e) => up("nome", e.target.value)} />

            {/* CARGO */}
            <div>
              <select className="border p-3 rounded w-full" value={perfil.cargo} onChange={(e) => {
                const val = e.target.value;
                if (val === "Outro") setMostrarOutroCargo(true);
                else {
                  up("cargo", val);
                  setMostrarOutroCargo(false);
                }
              }}>
                <option value="">Cargo...</option>
                {cargos.map((c) => <option key={c}>{c}</option>)}
                <option value="Outro">+ Outro</option>
              </select>
              {mostrarOutroCargo && (
                <div className="flex mt-2 gap-2">
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Digite outro cargo..."
                    value={outroCargo}
                    onChange={(e) => setOutroCargo(e.target.value)}
                  />
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 rounded" onClick={handleOutroCargo}>
                    ➕
                  </button>
                </div>
              )}
            </div>

            {/* ÁREA */}
            <div>
              <select className="border p-3 rounded w-full" value={perfil.area} onChange={(e) => {
                const val = e.target.value;
                if (val === "Outro") setMostrarOutraArea(true);
                else {
                  up("area", val);
                  setMostrarOutraArea(false);
                }
              }}>
                <option value="">Área...</option>
                {areas.map((a) => <option key={a}>{a}</option>)}
                <option value="Outro">+ Outra</option>
              </select>
              {mostrarOutraArea && (
                <div className="flex mt-2 gap-2">
                  <input
                    className="border p-2 rounded w-full"
                    placeholder="Digite outra área..."
                    value={outraArea}
                    onChange={(e) => setOutraArea(e.target.value)}
                  />
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 rounded" onClick={handleOutraArea}>
                    ➕
                  </button>
                </div>
              )}
            </div>

            <input className="border p-3 rounded w-full" placeholder="Localização (Cidade/UF)" value={perfil.localizacao} onChange={(e) => up("localizacao", e.target.value)} />
          </div>
        </div>
        <textarea className="border p-3 rounded w-full" placeholder="Resumo / Bio" value={perfil.resumo} onChange={(e) => up("resumo", e.target.value)} />
      </section>

      {/* HABILIDADES */}
      <section className="border rounded-lg p-6 space-y-6">
        <h2 className="font-semibold text-lg">Habilidades</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* técnicas */}
          <div>
            <label className="font-semibold">Habilidades Técnicas</label>
            <select className="border p-2 rounded w-full" onChange={(e) => setNovaHab(e.target.value)}>
              <option value="">Adicionar...</option>
              {habilidadesTecnicasOpcoes.map((h) => <option key={h}>{h}</option>)}
            </select>
            <div className="flex gap-2 mt-2">
              <input className="border p-2 rounded w-full" placeholder="Outra habilidade..." value={novaHab} onChange={(e) => setNovaHab(e.target.value)} />
              <button className="bg-yellow-400 px-3 rounded" onClick={() => {
                if (novaHab.trim()) {
                  up("habilidadesTecnicas", [...perfil.habilidadesTecnicas, novaHab.trim()]);
                  setNovaHab("");
                }
              }}>+</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {perfil.habilidadesTecnicas.map((h, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2">
                  {h}<button className="text-red-500" onClick={() => delItem("habilidadesTecnicas", i)}>x</button>
                </span>
              ))}
            </div>
          </div>

          {/* soft skills */}
          <div>
            <label className="font-semibold">Soft Skills</label>
            <select className="border p-2 rounded w-full" onChange={(e) => setNovaSoft(e.target.value)}>
              <option value="">Adicionar...</option>
              {softSkillsOpcoes.map((s) => <option key={s}>{s}</option>)}
            </select>
            <div className="flex gap-2 mt-2">
              <input className="border p-2 rounded w-full" placeholder="Outra soft skill..." value={novaSoft} onChange={(e) => setNovaSoft(e.target.value)} />
              <button className="bg-yellow-400 px-3 rounded" onClick={() => {
                if (novaSoft.trim()) {
                  up("softSkills", [...perfil.softSkills, novaSoft.trim()]);
                  setNovaSoft("");
                }
              }}>+</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {perfil.softSkills.map((s, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2">
                  {s}<button className="text-red-500" onClick={() => delItem("softSkills", i)}>x</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIÊNCIAS */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-lg">Experiências</h2>
        {perfil.experiencias.map((e, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input className="border p-2 rounded w-full" placeholder="Empresa" value={e.empresa || ""} onChange={(ev) => updateNested("experiencias", i, "empresa", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Cargo" value={e.cargo || ""} onChange={(ev) => updateNested("experiencias", i, "cargo", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Início (AAAA-MM)" value={e.inicio || ""} onChange={(ev) => updateNested("experiencias", i, "inicio", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Fim (AAAA-MM ou Atual)" value={e.fim || ""} onChange={(ev) => updateNested("experiencias", i, "fim", ev.target.value)} />
            <textarea className="border p-2 rounded w-full" placeholder="Descrição" value={e.descricao || ""} onChange={(ev) => updateNested("experiencias", i, "descricao", ev.target.value)} />
            <button className="text-red-500" onClick={() => delItem("experiencias", i)}>Remover</button>
          </div>
        ))}
        <button className="bg-yellow-400 px-4 py-2 rounded" onClick={() => addItem("experiencias", { empresa: "", cargo: "", inicio: "", fim: "", descricao: "" })}>+ Adicionar</button>
      </section>

      {/* FORMAÇÃO */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-lg">Formação</h2>
        {perfil.formacao.map((f, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input className="border p-2 rounded w-full" placeholder="Curso" value={f.curso || ""} onChange={(ev) => updateNested("formacao", i, "curso", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Instituição" value={f.instituicao || ""} onChange={(ev) => updateNested("formacao", i, "instituicao", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Ano" value={f.ano || ""} onChange={(ev) => updateNested("formacao", i, "ano", ev.target.value)} />
            <button className="text-red-500" onClick={() => delItem("formacao", i)}>Remover</button>
          </div>
        ))}
        <button className="bg-yellow-400 px-4 py-2 rounded" onClick={() => addItem("formacao", { curso: "", instituicao: "", ano: "" })}>+ Adicionar</button>
      </section>

      {/* PROJETOS */}
      <section className="border rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-lg">Projetos</h2>
        {perfil.projetos.map((p, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <input className="border p-2 rounded w-full" placeholder="Título" value={p.titulo || ""} onChange={(ev) => updateNested("projetos", i, "titulo", ev.target.value)} />
            <input className="border p-2 rounded w-full" placeholder="Link" value={p.link || ""} onChange={(ev) => updateNested("projetos", i, "link", ev.target.value)} />
            <textarea className="border p-2 rounded w-full" placeholder="Descrição" value={p.descricao || ""} onChange={(ev) => updateNested("projetos", i, "descricao", ev.target.value)} />
            <button className="text-red-500" onClick={() => delItem("projetos", i)}>Remover</button>
          </div>
        ))}
        <button className="bg-yellow-400 px-4 py-2 rounded" onClick={() => addItem("projetos", { titulo: "", link: "", descricao: "" })}>+ Adicionar</button>
      </section>

      {/* ===== ADIÇÕES: CERTIFICAÇÕES ===== */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-semibold text-lg">Certificações</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Adicionar certificação..."
            value={novaCert}
            onChange={(e) => setNovaCert(e.target.value)}
          />
          <button className="bg-yellow-400 px-3 rounded" onClick={addCert}>+</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(perfil.certificacoes || []).map((c, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2">
              {c}
              <button className="text-red-500" onClick={() => removeCert(i)}>x</button>
            </span>
          ))}
        </div>
      </section>

      {/* ===== ADIÇÕES: IDIOMAS ===== */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-semibold text-lg">Idiomas</h2>
        <div className="flex flex-wrap gap-2">
          <input
            className="border p-2 rounded w-1/2"
            placeholder="Idioma"
            value={novoIdioma.idioma}
            onChange={(e) => setNovoIdioma({ ...novoIdioma, idioma: e.target.value })}
          />
          <input
            className="border p-2 rounded w-1/2"
            placeholder="Nível (básico, intermediário, fluente...)"
            value={novoIdioma.nivel}
            onChange={(e) => setNovoIdioma({ ...novoIdioma, nivel: e.target.value })}
          />
          <button className="bg-yellow-400 px-3 rounded" onClick={addIdioma}>+</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(perfil.idiomas || []).map((i, x) => (
            <span key={x} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2">
              {i.idioma} — {i.nivel}
              <button className="text-red-500" onClick={() => removeIdioma(x)}>x</button>
            </span>
          ))}
        </div>
      </section>

      {/* ===== ADIÇÕES: ÁREAS DE INTERESSE ===== */}
      <section className="border rounded-lg p-6 space-y-3">
        <h2 className="font-semibold text-lg">Áreas de Interesse</h2>
        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Adicionar área de interesse..."
            value={novaAreaInteresse}
            onChange={(e) => setNovaAreaInteresse(e.target.value)}
          />
          <button className="bg-yellow-400 px-3 rounded" onClick={addAreaInteresse}>+</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {(perfil.areaInteresses || []).map((a, i) => (
            <span key={i} className="bg-gray-200 px-2 py-1 rounded flex items-center gap-2">
              {a}
              <button className="text-red-500" onClick={() => removeAreaInteresse(i)}>x</button>
            </span>
          ))}
        </div>
      </section>

      <button onClick={salvar} className="mx-auto block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded shadow">
        Salvar Perfil
      </button>
    </div>
  );
}