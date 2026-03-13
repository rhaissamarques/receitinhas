import './ReceitaCard.css'

const tagLabels = {
  'sem-gluten': '🌾 Sem glúten',
  'sem-acucar': '🍬 Sem açúcar',
  'low-carb':   '⚡ Low carb',
}

export default function ReceitaCard({ receita, onAbrir, favorito, onToggleFavorito, tamanho = 'normal' }) {
  const handleFav = (e) => {
    e.stopPropagation()
    onToggleFavorito(receita.id)
  }

  return (
    <div
      className={`receita-card receita-card--${tamanho} fade-up`}
      onClick={() => onAbrir(receita)}
    >
      <div className="card-img-wrap">
        <img src={receita.imagem} alt={receita.nome} className="card-img" loading="lazy" />
        <button className={`fav-btn ${favorito ? 'fav-btn--ativo' : ''}`} onClick={handleFav} aria-label="Favoritar">
          {favorito ? '❤️' : '🤍'}
        </button>
        <div className="card-categoria">{receita.categoria}</div>
      </div>
      <div className="card-body">
        <h3 className="card-nome">{receita.nome}</h3>
        <div className="card-meta">
          <span>⏱ {receita.tempo}</span>
          <span>🍽 {receita.porcoes} {receita.porcoes === 1 ? 'porção' : 'porções'}</span>
        </div>
        <div className="card-tags">
          {receita.tags.map(tag => (
            <span key={tag} className={`tag tag-${tag}`}>{tagLabels[tag]}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
