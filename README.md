# Xhopii — Sistema WEB E-commerce (TP1 - Front-End)

Trabalho Prático 1 da disciplina **Técnicas Avançadas em Programação Web e Mobile**
(Fatec Presidente Prudente — ADS). Implementação do *Front-End* completo do
e-commerce fictício **Xhopii**, com HTML semântico, CSS (Flexbox + Grid Layout)
e JavaScript puro. O Bootstrap é usado **somente** no efeito de carrossel da Home.

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

```bash
cd XHOPII
git init
git add .
git commit -m "TP1 - Front-End Xhopii: estrutura inicial"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/xhopii.git
git push -u origin main
```

## Tecnologias

- HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 com **Flexbox** e **CSS Grid** (sem frameworks de estilo)
- JavaScript puro (ES6+), sem bibliotecas
- Bootstrap 5 (local, em `assets/vendor/bootstrap`) **apenas** para o carrossel da Home
- Git / GitHub para controle de versão
