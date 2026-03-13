import { useState } from 'react'
import './ReceitaDetalhe.css'

const tagLabels = {
  'sem-gluten': '🌾 Sem glúten',
  'sem-acucar': '🍬 Sem açúcar',
  'low-carb':   '⚡ Low carb',
}

export default function ReceitaDetalhe({ receita, favoritos, onToggleFavorito, onVoltar }) {
  const [passoAtivo, setPassoAtivo] = useState(null)
  const [porcoes, setPorcoes] = useState(receita.porcoes)
  const fator = porcoes / receita.porcoes
  const isFav = favoritos.includes(receita.id)

  const ajustarQtd = (quantidade) => {
    if (!quantidade || quantidade === 'a gosto') return quantidade
    const num = parseFloat(quantidade)
    if (isNaN(num)) return quantidade
    const ajustado = num * fator
    return Number.isInteger(ajustado) ? ajustado : ajustado.toFixed(1)
  }

  return (
    <div className="detalhe">
      {/* Imagem hero */}
      <div className="detalhe-hero">
        <img src={receita.imagem} alt={receita.nome} className="detalhe-img" />
        <div className="detalhe-hero-overlay" />

        <button className="voltar-btn" onClick={onVoltar} aria-label="Voltar">
          ← Voltar
        </button>

        <button
          className={`detalhe-fav ${isFav ? 'detalhe-fav--ativo' : ''}`}
          onClick={() => onToggleFavorito(receita.id)}
          aria-label="Favoritar"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Conteúdo */}
      <div className="detalhe-content">
        {/* Titulo */}
        <div className="detalhe-topo">
          <span className="detalhe-categoria">{receita.categoria}</span>
          <h1 className="detalhe-nome">{receita.nome}</h1>
          <p className="detalhe-descricao">{receita.descricao}</p>

          {/* Tags */}
          <div className="detalhe-tags">
            {receita.tags.map(tag => (
              <span key={tag} className={`tag tag-${tag}`}>{tagLabels[tag]}</span>
            ))}
          </div>

          {/* Meta */}
          <div className="detalhe-meta">
            <div className="meta-item">
              <span className="meta-icon">⏱</span>
              <span className="meta-val">{receita.tempo}</span>
              <span className="meta-label">Tempo</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-icon">🍽</span>
              <span className="meta-val">{receita.porcoes}</span>
              <span className="meta-label">Porções orig.</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item porcoes-ctrl">
              <span className="meta-icon">👤</span>
              <div className="porcoes-ajuste">
                <button onClick={() => setPorcoes(p => Math.max(1, p - 1))}>−</button>
                <span className="meta-val">{porcoes}</span>
                <button onClick={() => setPorcoes(p => p + 1)}>+</button>
              </div>
              <span className="meta-label">Ajustar</span>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="detalhe-section">
          <h2 className="detalhe-section-title">🛒 Ingredientes</h2>
          <ul className="ingredientes-list">
            {receita.ingredientes.map((ing, i) => (
              <li key={i} className="ingrediente-item">
                <span className="ing-qtd">
                  {ajustarQtd(ing.quantidade)}{ing.unidade ? ` ${ing.unidade}` : ''}
                </span>
                <span className="ing-item">{ing.item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modo de preparo */}
        <div className="detalhe-section">
          <h2 className="detalhe-section-title">👨‍🍳 Modo de preparo</h2>
          <p className="preparo-hint">Toque em cada passo para marcar como concluído</p>
          <ol className="passos-list">
            {receita.modo_preparo.map((passo, i) => (
              <li
                key={i}
                className={`passo-item ${passoAtivo === i ? 'passo-item--ativo' : ''} ${passoAtivo !== null && passoAtivo > i ? 'passo-item--feito' : ''}`}
                onClick={() => setPassoAtivo(passoAtivo === i ? null : i)}
              >
                <div className="passo-num">
                  {passoAtivo !== null && passoAtivo > i ? '✓' : i + 1}
                </div>
                <p className="passo-texto">{passo}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
