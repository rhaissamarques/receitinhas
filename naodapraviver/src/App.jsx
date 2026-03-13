import { useState } from 'react'
import Home from './pages/Home'
import ReceitaDetalhe from './pages/ReceitaDetalhe'
import Favoritos from './pages/Favoritos'
import Categorias from './pages/Categorias'
import NavBar from './components/NavBar'
import './styles/global.css'

export default function App() {
  const [pagina, setPagina] = useState('home')
  const [receitaSelecionada, setReceitaSelecionada] = useState(null)
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('favoritos')
    return saved ? JSON.parse(saved) : []
  })
  const [categoriaFiltro, setCategoriaFiltro] = useState(null)

  const toggleFavorito = (id) => {
    setFavoritos(prev => {
      const novos = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem('favoritos', JSON.stringify(novos))
      return novos
    })
  }

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita)
    setPagina('detalhe')
  }

  const abrirCategoria = (cat) => {
    setCategoriaFiltro(cat)
    setPagina('categorias')
  }

  return (
    <div className="app-container">
      <main className="main-content">
        {pagina === 'home' && (
          <Home
            onAbrirReceita={abrirReceita}
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito}
            onAbrirCategoria={abrirCategoria}
          />
        )}
        {pagina === 'detalhe' && receitaSelecionada && (
          <ReceitaDetalhe
            receita={receitaSelecionada}
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito}
            onVoltar={() => setPagina('home')}
          />
        )}
        {pagina === 'favoritos' && (
          <Favoritos
            favoritos={favoritos}
            onAbrirReceita={abrirReceita}
            onToggleFavorito={toggleFavorito}
          />
        )}
        {pagina === 'categorias' && (
          <Categorias
            categoriaInicial={categoriaFiltro}
            onAbrirReceita={abrirReceita}
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito}
          />
        )}
      </main>
      <NavBar pagina={pagina} setPagina={setPagina} totalFavoritos={favoritos.length} />
    </div>
  )
}
