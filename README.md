# Xhopii — Sistema WEB E-commerce (TP1 - Front-End)

Trabalho Prático 1 da disciplina **Técnicas Avançadas em Programação Web e Mobile**
(Fatec Presidente Prudente — ADS). Implementação do *Front-End* completo do
e-commerce fictício **Xhopii**, com HTML semântico, CSS (Flexbox + Grid Layout)
e JavaScript puro. O Bootstrap é usado **somente** no efeito de carrossel da Home.

## Estrutura do projeto

```
XHOPII
├── assets
│   ├── img/              # imagens (logo, banners, produtos, avatares, etc.)
│   ├── vendor/bootstrap/  # Bootstrap local (CSS/JS), usado só no carrossel da Home
│   ├── script.js          # JavaScript da aplicação (navbar, formulários, dados, etc.)
│   └── style.css          # estilos (Flexbox + CSS Grid, sem frameworks)
├── view/
│   ├── home.html
│   ├── redefinir-senha.html
│   ├── cadastro-cliente.html
│   ├── cadastro-funcionario.html
│   ├── cadastro-produto.html
│   ├── cadastro-cupom.html
│   ├── cadastro-loja.html
│   ├── clientes.html
│   ├── funcionarios.html
│   ├── produtos.html
│   ├── loja.html
│   ├── cupons.html
│   └── produto.html
└── index.html             # tela de Login (ponto de entrada do sistema)
```

## Telas implementadas

| Tela                         | Arquivo                          |
|-------------------------------|-----------------------------------|
| Login                          | `index.html`                     |
| Redefinição de Senha           | `view/redefinir-senha.html`      |
| Home                           | `view/home.html`                 |
| Cadastrar Cliente               | `view/cadastro-cliente.html`     |
| Cadastrar Funcionário           | `view/cadastro-funcionario.html` |
| Cadastrar Produto               | `view/cadastro-produto.html`     |
| Cadastrar Cupom de Desconto     | `view/cadastro-cupom.html`       |
| Cadastrar Loja                  | `view/cadastro-loja.html`        |
| Visualizar Clientes             | `view/clientes.html`             |
| Visualizar Funcionários         | `view/funcionarios.html`         |
| Visualizar Produtos             | `view/produtos.html`             |
| Visualizar Loja                 | `view/loja.html`                 |
| Visualizar Cupom de Desconto    | `view/cupons.html`               |
| Visualizar um Produto específico| `view/produto.html`              |

## Como executar

Não há back-end: é só HTML/CSS/JS estático. Duas formas de rodar:

1. **Abrir direto:** dois cliques em `index.html`.
2. **Recomendado (evita bloqueios de `file://` no navegador):** usar um servidor
   local, por exemplo a extensão *Live Server* do VS Code, ou:
   ```bash
   python3 -m http.server 8000
   ```
   e acessar `http://localhost:8000/index.html`.

## Sobre os dados

Como o trabalho é apenas de *Front-End*, não existe banco de dados real. As
telas de "Visualizar" (Clientes, Funcionários, Produtos, Loja, Cupons) exibem
dados fictícios de exemplo (definidos em `assets/script.js`). Os formulários de
cadastro fazem validação de campos obrigatórios e, ao serem enviados com
sucesso, mostram uma confirmação e redirecionam para a tela de visualização
correspondente — mas não persistem dados entre páginas (não há back-end).

## Versionamento com Git/GitHub

Passo a passo sugerido para subir o projeto ao GitHub:

```bash
cd XHOPII
git init
git add .
git commit -m "TP1 - Front-End Xhopii: estrutura inicial"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/xhopii.git
git push -u origin main
```

A cada nova tela ou ajuste, faça commits pequenos e descritivos
(ex.: `git commit -m "Implementa tela de cadastro de cupom"`), já que o
controle de versão do projeto é item obrigatório de avaliação.

## Tecnologias

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 com **Flexbox** e **CSS Grid** (sem frameworks de estilo)
- JavaScript puro (ES6+), sem bibliotecas
- Bootstrap 5 (local, em `assets/vendor/bootstrap`) **apenas** para o carrossel da Home
- Git / GitHub para controle de versão
