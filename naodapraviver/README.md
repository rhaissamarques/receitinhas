# 🥗 Não dá pra viver só de amor

Site de receitas saudáveis — sem glúten, sem açúcar e low carb.

## Funcionalidades

- 🔍 Busca por receita ou ingrediente
- 🥗 Filtro por categoria (Café da manhã, Almoço, Jantar, Lanches, Sobremesas)
- 🏷 Filtros de restrição alimentar (Sem glúten / Sem açúcar / Low carb)
- ❤️ Favoritos salvos no dispositivo
- 👨‍🍳 Modo de preparo passo a passo interativo
- ⚖️ Ajuste automático de porções

---

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse em `http://localhost:5173`

---

## Como adicionar uma nova receita

Abra o arquivo `src/data/receitas.js` e copie o modelo abaixo:

```js
{
  id: 99,                          // número único, incrementa sempre
  nome: "Nome da Receita",
  categoria: "Almoço",             // Café da manhã | Almoço | Jantar | Lanches | Sobremesas
  imagem: "https://...",           // URL do Cloudinary, Imgur, ou outro serviço
  tempo: "30 min",
  porcoes: 2,
  tags: ["sem-gluten", "sem-acucar", "low-carb"],  // use as que se aplicam
  descricao: "Uma frase descrevendo a receita.",
  ingredientes: [
    { quantidade: "200g", unidade: "", item: "frango" },
    { quantidade: "2", unidade: "colheres de sopa", item: "azeite" },
    { quantidade: "a gosto", unidade: "", item: "sal e pimenta" },
  ],
  modo_preparo: [
    "Primeiro passo...",
    "Segundo passo...",
    "Terceiro passo...",
  ],
},
```

Depois é só fazer `git push` e o GitHub Actions cuida do deploy automaticamente! 🚀

---

## Como hospedar no GitHub Pages

1. Crie um repositório no GitHub com o nome `naodapraviver`
2. No `vite.config.js`, confirme que `base` está com o nome correto do repositório:
   ```js
   base: '/naodapraviver/'
   ```
3. Faça o primeiro push:
   ```bash
   git init
   git add .
   git commit -m "primeiro commit 💚"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/naodapraviver.git
   git push -u origin main
   ```
4. No GitHub, vá em **Settings → Pages** e selecione a branch `gh-pages` como fonte.
5. Pronto! O site estará disponível em `https://SEU_USUARIO.github.io/naodapraviver`

A cada `git push` na branch `main`, o site é atualizado automaticamente. ✨
