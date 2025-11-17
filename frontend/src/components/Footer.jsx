export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 mt-12">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} ConectaPro — Todos os direitos reservados.
      </div>
    </footer>
  );
}