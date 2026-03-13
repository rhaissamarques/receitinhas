import { useState } from 'react'
import receitas from '../data/receitas'
import ReceitaCard from '../components/ReceitaCard'
import './Categorias.css'

const cats = [
  { nome: 'Café da manhã', emoji: '☀️', cor: '#F5A623' },
  { nome: 'Almoço',        emoji: '🥗', cor: '#7ED321' },
  { nome: 'Jantar',        emoji: '🌙', cor: '#4A90E2' },
  { nome: 'Lanches',       emoji: '🥜', cor: '#BD8B4A' },
  { nome: 'Sobremesas',    emoji: '🍮', cor: '#C85C3A' },
]

export default function Categorias({ categoriaInicial, onAbrirReceita, favoritos, onToggleFavorito }) {
  const [selecionada, setSelecionada] = useState(categoriaInicial || null)

  const receitasCat = selecionada
    ? receitas.filter(r => r.categoria === selecionada)
    : []

  return (
    <div className="categorias">
      <div className="cat-header">
        <h1 className="cat-title">Categorias</h1>
        <p className="cat-subtitle">Explore por tipo de refeição 🍽</p>
      </div>

      <div className="cats-list">
        {cats.map(cat => {
          const qtd = receitas.filter(r => r.categoria === cat.nome).length
          return (
            <button
              key={cat.nome}
              className={`cat-card ${selecionada === cat.nome ? 'cat-card--ativa' : ''}`}
              style={{ '--cat-cor': cat.cor }}
              onClick={() => setSelecionada(selecionada === cat.nome ? null : cat.nome)}
            >
              <span className="cat-card-emoji">{cat.emoji}</span>
              <div className="cat-card-info">
                <span className="cat-card-nome">{cat.nome}</span>
                <span className="cat-card-qtd">{qtd} {qtd === 1 ? 'receita' : 'receitas'}</span>
              </div>
              <span className="cat-card-arrow">{selecionada === cat.nome ? '▲' : '▶'}</span>
            </button>
          )
        })}
      </div>

      {selecionada && receitasCat.length > 0 && (
        <div className="cat-receitas">
          <h2 className="cat-receitas-title">{selecionada}</h2>
          <div className="receitas-grid">
            {receitasCat.map((r, i) => (
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
        </div>
      )}
    </div>
  )
}
