export default function SearchBar({ termo, setTermo, area, setArea, skill, setSkill, areas }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        rounded-xl p-4 
        grid md:grid-cols-3 gap-3
        text-gray-900 dark:text-gray-100
      "
    >
      <input
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar por nome ou cargo..."
        className="
          border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100
          rounded-lg px-3 py-2
          placeholder-gray-400 dark:placeholder-gray-300
        "
      />

      <select
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className="
          border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100
          rounded-lg px-3 py-2
        "
      >
        <option value="">Todas as áreas</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <input
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        placeholder="Filtrar por skill (ex: React)"
        className="
          border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-700 
          text-gray-900 dark:text-gray-100
          rounded-lg px-3 py-2
          placeholder-gray-400 dark:placeholder-gray-300
        "
      />
    </div>
  );
}