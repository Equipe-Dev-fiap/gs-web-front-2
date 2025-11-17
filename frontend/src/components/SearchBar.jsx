export default function SearchBar({ termo, setTermo, area, setArea, skill, setSkill, areas }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 grid md:grid-cols-3 gap-3">
      <input
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar por nome ou cargo..."
        className="border rounded-lg px-3 py-2"
      />
      <select
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="border rounded-lg px-3 py-2"
      >
        <option value="">Todas as áreas</option>
        {areas.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <input
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Filtrar por skill (ex: React)"
        className="border rounded-lg px-3 py-2"
      />
    </div>
  );
}