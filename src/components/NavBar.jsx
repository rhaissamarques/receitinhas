import './NavBar.css'

const nav = [
  { id: 'home',       icon: '🏠', label: 'Início' },
  { id: 'categorias', icon: '🥗', label: 'Categorias' },
  { id: 'favoritos',  icon: '❤️',  label: 'Favoritos' },
]

export default function NavBar({ pagina, setPagina, totalFavoritos }) {
  return (
    <nav className="navbar">
      {nav.map(item => (
        <button
          key={item.id}
          className={`nav-item ${pagina === item.id ? 'active' : ''}`}
          onClick={() => setPagina(item.id)}
        >
          <span className="nav-icon">
            {item.icon}
            {item.id === 'favoritos' && totalFavoritos > 0 && (
              <span className="badge">{totalFavoritos}</span>
            )}
          </span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
