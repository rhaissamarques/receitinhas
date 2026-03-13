import receitas from '../data/receitas'
import ReceitaCard from '../components/ReceitaCard'
import './Favoritos.css'

export default function Favoritos({ favoritos, onAbrirReceita, onToggleFavorito }) {
  const receitasFav = receitas.filter(r => favoritos.includes(r.id))

  return (
    <div className="favoritos">
      <div className="fav-header">
        <h1 className="fav-title">Favoritos</h1>
        <p className="fav-subtitle">Suas receitas guardadas com carinho ❤️</p>
      </div>

      {receitasFav.length === 0 ? (
        <div className="empty-state">
          <p className="empty-emoji">🤍</p>
          <p className="empty-text">
            Nenhuma receita favorita ainda.<br />
            Toque no coração de qualquer receita para salvar aqui!
          </p>
        </div>
      ) : (
        <div className="receitas-grid fav-grid">
          {receitasFav.map((r, i) => (
            <div key={r.id} style={{ animationDelay: `${i * 60}ms` }}>
              <ReceitaCard
                receita={r}
                onAbrir={onAbrirReceita}
                favorito={true}
                onToggleFavorito={onToggleFavorito}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
