import { useState, useMemo } from 'react'
import receitas from '../data/receitas'
import ReceitaCard from '../components/ReceitaCard'
import './Home.css'

const categorias = ['Todas', 'Café da manhã', 'Almoço', 'Jantar', 'Lanches', 'Sobremesas']
const filtrosTag = [
  { id: 'sem-gluten', label: '🌾 Sem glúten' },
  { id: 'sem-acucar', label: '🍬 Sem açúcar' },
  { id: 'low-carb',   label: '⚡ Low carb' },
]

export default function Home({ onAbrirReceita, favoritos, onToggleFavorito }) {
  const [busca, setBusca] = useState('')
  const [categoriaSel, setCategoriaSel] = useState('Todas')
  const [tagsSel, setTagsSel] = useState([])

  const toggleTag = (tag) => {
    setTagsSel(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const receitasFiltradas = useMemo(() => {
    return receitas.filter(r => {
      const matchBusca = busca === '' ||
        r.nome.toLowerCase().includes(busca.toLowerCase()) ||
        r.ingredientes.some(i => i.item.toLowerCase().includes(busca.toLowerCase()))
      const matchCat = categoriaSel === 'Todas' || r.categoria === categoriaSel
      const matchTags = tagsSel.length === 0 || tagsSel.every(t => r.tags.includes(t))
      return matchBusca && matchCat && matchTags
    })
  }, [busca, categoriaSel, tagsSel])

  const destaques = receitas.slice(0, 3)

  return (
    <div className="home">
      {/* Header */}
      <div className="home-header">
        <div className="home-header-text">
          <p className="home-subtitle">Receitas saudáveis com amor 💚</p>
          <h1 className="home-title">Não dá pra viver<br /><em>só de amor</em></h1>
        </div>
        <div className="home-header-emoji">🥗</div>
      </div>

      {/* Busca */}
      <div className="busca-wrap">
        <div className="busca-box">
          <span className="busca-icon">🔍</span>
          <input
            className="busca-input"
            type="text"
            placeholder="Busque por receita ou ingrediente..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && (
            <button className="busca-clear" onClick={() => setBusca('')}>✕</button>
          )}
        </div>
      </div>

      {/* Filtros de tag */}
      <div className="scroll-row filtros-row">
        {filtrosTag.map(f => (
          <button
            key={f.id}
            className={`filtro-tag ${tagsSel.includes(f.id) ? 'filtro-tag--ativo' : ''}`}
            onClick={() => toggleTag(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Se não está buscando, mostra destaques */}
      {!busca && tagsSel.length === 0 && categoriaSel === 'Todas' && (
        <>
          <div className="section-header">
            <h2 className="section-title">Em destaque</h2>
          </div>
          <div className="scroll-row">
            {destaques.map(r => (
              <ReceitaCard
                key={r.id}
                receita={r}
                onAbrir={onAbrirReceita}
                favorito={favoritos.includes(r.id)}
                onToggleFavorito={onToggleFavorito}
                tamanho="large"
              />
            ))}
          </div>
        </>
      )}

      {/* Categorias */}
      <div className="scroll-row categorias-row">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`cat-pill ${categoriaSel === cat ? 'cat-pill--ativo' : ''}`}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de receitas */}
      <div className="section-header">
        <h2 className="section-title">
          {busca ? `Resultados para "${busca}"` : categoriaSel === 'Todas' ? 'Todas as receitas' : categoriaSel}
        </h2>
        <span className="section-count">{receitasFiltradas.length} receitas</span>
      </div>

      {receitasFiltradas.length === 0 ? (
        <div className="empty-state">
          <p className="empty-emoji">🥺</p>
          <p className="empty-text">Nenhuma receita encontrada.<br />Que tal adicionar uma nova?</p>
        </div>
      ) : (
        <div className="receitas-grid">
          {receitasFiltradas.map((r, i) => (
            <div key={r.id} style={{ animationDelay: `${i * 60}ms` }}>
              <ReceitaCard
                receita={r}
                onAbrir={onAbrirReceita}
                favorito={favoritos.includes(r.id)}
                onToggleFavorito={onToggleFavorito}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
