/* ==========================================================================
   XHOPII — script.js
   TP1 - Front-End | Técnicas Avançadas em Programação Web e Mobile
   JavaScript puro (sem frameworks). Bootstrap é usado somente para o
   comportamento do componente de carrossel (view/home.html).
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     0. Helpers
     --------------------------------------------------------------------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function showToast(mensagem, tipo) {
    let toast = $(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = mensagem;
    toast.className = "toast visivel" + (tipo ? " toast--" + tipo : "");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove("visivel");
    }, 2600);
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* ---------------------------------------------------------------------
     1. Navbar — menu mobile, dropdown "Mais" e item ativo
     --------------------------------------------------------------------- */
  function initNavbar() {
    const linha = $(".navbar__linha");
    const burger = $(".navbar__burger");
    if (burger && linha) {
      burger.addEventListener("click", () => {
        const aberto = linha.classList.toggle("aberto");
        burger.setAttribute("aria-expanded", String(aberto));
      });
    }

    $$(".navbar__dropdown-toggle").forEach((toggle) => {
      const dropdown = toggle.closest(".navbar__dropdown");
      toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const estavaAberto = dropdown.classList.contains("aberto");
        $$(".navbar__dropdown.aberto").forEach((d) => d.classList.remove("aberto"));
        if (!estavaAberto) dropdown.classList.add("aberto");
      });
    });

    document.addEventListener("click", () => {
      $$(".navbar__dropdown.aberto").forEach((d) => d.classList.remove("aberto"));
    });

    // marca o link ativo com base no arquivo atual
    const arquivoAtual = location.pathname.split("/").pop() || "index.html";
    $$(".navbar__nav a, .navbar__dropdown-menu a").forEach((a) => {
      const href = a.getAttribute("href");
      if (href && href.split("/").pop() === arquivoAtual) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------------------------------------------------------------
     2. Campos de arquivo — mostra o nome do arquivo escolhido
     --------------------------------------------------------------------- */
  function initFileInputs() {
    $$('input[type="file"]').forEach((input) => {
      const rotulo = input.parentElement.querySelector(".campo-arquivo__nome");
      if (!rotulo) return;
      input.addEventListener("change", () => {
        rotulo.textContent = input.files.length
          ? input.files[0].name
          : "Nenhum arquivo escolhido";
      });
    });
  }

  /* ---------------------------------------------------------------------
     3. Validação genérica de formulários
     --------------------------------------------------------------------- */
  function validarFormulario(form) {
    let valido = true;
    let primeiroInvalido = null;

    $$("[required]", form).forEach((campo) => {
      const wrapper = campo.closest(".campo") || campo.parentElement;
      const vazio = campo.type === "checkbox" ? !campo.checked : !campo.value.trim();
      if (vazio) {
        valido = false;
        wrapper.classList.add("invalido");
        if (!primeiroInvalido) primeiroInvalido = campo;
      } else {
        wrapper.classList.remove("invalido");
      }
    });

    if (primeiroInvalido) primeiroInvalido.focus();
    return valido;
  }

  function initValidacaoAoVivo(form) {
    $$("[required]", form).forEach((campo) => {
      campo.addEventListener("input", () => {
        const wrapper = campo.closest(".campo") || campo.parentElement;
        const vazio = campo.type === "checkbox" ? !campo.checked : !campo.value.trim();
        wrapper.classList.toggle("invalido", vazio && campo._tocado);
      });
      campo.addEventListener("blur", () => {
        campo._tocado = true;
      });
    });
  }

  /**
   * Liga um formulário de autenticação (login / redefinir senha) que,
   * ao ser validado com sucesso, redireciona para outra página.
   */
  function handleFormAuth(formId, redirectUrl, mensagem) {
    const form = document.getElementById(formId);
    if (!form) return;
    initValidacaoAoVivo(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validarFormulario(form)) return;
      const msgBox = $(".mensagem-envio", form) || $(".mensagem-envio");
      if (msgBox) {
        msgBox.textContent = mensagem;
        msgBox.classList.add("visivel");
      }
      const botao = $('button[type="submit"]', form);
      if (botao) {
        botao.disabled = true;
        botao.textContent = "Aguarde...";
      }
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 900);
    });
  }

  /**
   * Liga um formulário de cadastro: valida, mostra toast de sucesso
   * e redireciona para a tela de visualização correspondente.
   */
  function handleCadastro(formId, redirectUrl, mensagem) {
    const form = document.getElementById(formId);
    if (!form) return;
    initValidacaoAoVivo(form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validarFormulario(form)) {
        showToast("Preencha os campos obrigatórios.", "erro");
        return;
      }
      showToast(mensagem || "Cadastrado com sucesso!", "sucesso");
      const botao = $('button[type="submit"]', form);
      if (botao) {
        botao.disabled = true;
        botao.textContent = "Cadastrando...";
      }
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1100);
    });
  }

  /* ---------------------------------------------------------------------
     4. Dados mock (sem back-end — apenas para exibição em tela)
     --------------------------------------------------------------------- */
  const PRODUTOS = Array.from({ length: 10 }).map((_, i) => {
    const cores = ["preto", "azul", "verde", "cinza", "rosa"];
    return {
      id: i + 1,
      nome: "Camisa Desenvolvedor Front-End CSS",
      fabricante: "Cléiva Uniformes",
      descricao: "Uma Camisa ideal para programar por mais de 12 horas",
      valor: 59.9,
      valorDetalhe: 56.9,
      quantidade: 171,
      imagem: `../assets/img/produto-${cores[i % cores.length]}.png`,
      imagemRaiz: `assets/img/produto-${cores[i % cores.length]}.png`,
    };
  });

  const CLIENTES = [
    { nome: "Ana Beatriz Ferreira", cpf: "123.456.789-00", email: "ana.ferreira@email.com", telefone: "(18) 99123-4567", avatar: "avatar-1.png" },
    { nome: "Bruno Costa Lima", cpf: "234.567.890-11", email: "bruno.lima@email.com", telefone: "(18) 99234-5678", avatar: "avatar-2.png" },
    { nome: "Carla Menezes Souza", cpf: "345.678.901-22", email: "carla.souza@email.com", telefone: "(18) 99345-6789", avatar: "avatar-3.png" },
    { nome: "Diego Almeida Rocha", cpf: "456.789.012-33", email: "diego.rocha@email.com", telefone: "(18) 99456-7890", avatar: "avatar-4.png" },
    { nome: "Elisa Martins Pereira", cpf: "567.890.123-44", email: "elisa.pereira@email.com", telefone: "(18) 99567-8901", avatar: "avatar-1.png" },
    { nome: "Felipe Nogueira Dias", cpf: "678.901.234-55", email: "felipe.dias@email.com", telefone: "(18) 99678-9012", avatar: "avatar-2.png" },
  ];

  const FUNCIONARIOS = [
    { nome: "Gustavo Ribeiro Alves", cargo: "Desenvolvedor Front-End", salario: 4200, email: "gustavo.alves@xhopii.com", telefone: "(18) 99001-1122", avatar: "avatar-2.png" },
    { nome: "Helena Cardoso Melo", cargo: "Analista de Suporte", salario: 3100, email: "helena.melo@xhopii.com", telefone: "(18) 99002-2233", avatar: "avatar-3.png" },
    { nome: "Igor Teixeira Franco", cargo: "Gerente de Loja", salario: 5800, email: "igor.franco@xhopii.com", telefone: "(18) 99003-3344", avatar: "avatar-4.png" },
    { nome: "Julia Barros Cunha", cargo: "Analista Financeiro", salario: 4600, email: "julia.cunha@xhopii.com", telefone: "(18) 99004-4455", avatar: "avatar-1.png" },
    { nome: "Kaique Moraes Reis", cargo: "Estoquista", salario: 2400, email: "kaique.reis@xhopii.com", telefone: "(18) 99005-5566", avatar: "avatar-2.png" },
  ];

  const LOJAS = [
    { nome: "Xhopii Moda & Cia", categoria: "Vestuário", endereco: "Av. Brasil, 450 — Presidente Prudente/SP", nota: 5, logo: "loja-1.png" },
    { nome: "Xhopii Tech Store", categoria: "Eletrônicos", endereco: "R. das Palmeiras, 120 — Presidente Prudente/SP", nota: 4, logo: "loja-2.png" },
    { nome: "Xhopii Casa & Cia", categoria: "Casa e Decoração", endereco: "R. Coronel José Soares Marcondes, 88", nota: 5, logo: "loja-3.png" },
  ];

  const CUPONS = [
    { codigo: "BEMVINDO10", descricao: "10% de desconto para novos usuários", tipo: "percentual", valor: 10, validade: "30/09/2026", quantidade: 500 },
    { codigo: "FRETEGRATIS", descricao: "Frete grátis em compras acima de R$ 99", tipo: "frete", valor: 0, validade: "15/10/2026", quantidade: 300 },
    { codigo: "CONSUMIDOR20", descricao: "Mês do consumidor: 20% off em toda loja", tipo: "percentual", valor: 20, validade: "30/09/2026", quantidade: 150 },
    { codigo: "PRIMEIRACOMPRA15", descricao: "R$ 15 de desconto na primeira compra", tipo: "fixo", valor: 15, validade: "31/12/2026", quantidade: 1000 },
  ];

  /* ---------------------------------------------------------------------
     5. Renderização — grid de produtos
     --------------------------------------------------------------------- */
  function renderProdutos(seletor, opts) {
    const container = $(seletor);
    if (!container) return;
    const config = Object.assign({ linkBase: "produto.html", imagemRaiz: false, comFabricante: false }, opts);

    container.innerHTML = PRODUTOS.map((p) => `
      <article class="cartao-produto">
        <a href="${config.linkBase}?id=${p.id}" class="cartao-produto__imagem">
          <img src="${config.imagemRaiz ? p.imagemRaiz : p.imagem}" alt="${p.nome}" loading="lazy">
        </a>
        <div class="cartao-produto__corpo">
          <h3 class="cartao-produto__nome"><a href="${config.linkBase}?id=${p.id}">${p.nome}</a></h3>
          ${config.comFabricante ? `<p class="cartao-produto__fabricante"><strong>Fabricante:</strong> ${p.fabricante}</p>
          <p class="cartao-produto__descricao"><strong>Descrição:</strong> ${p.descricao}</p>` : ""}
          <p class="cartao-produto__preco">${formatarMoeda(p.valor)}</p>
          <p class="cartao-produto__estoque">${p.quantidade} disponíveis</p>
        </div>
      </article>
    `).join("");
  }

  /* ---------------------------------------------------------------------
     6. Renderização — clientes / funcionários / lojas / cupons
     --------------------------------------------------------------------- */
  function renderClientes(seletor) {
    const container = $(seletor);
    if (!container) return;
    container.innerHTML = CLIENTES.map((c) => `
      <article class="cartao-pessoa">
        <div class="cartao-pessoa__avatar"><img src="../assets/img/${c.avatar}" alt="" loading="lazy"></div>
        <div class="cartao-pessoa__info">
          <p class="cartao-pessoa__nome">${c.nome}</p>
          <p class="cartao-pessoa__linha">📧 <span class="valor">${c.email}</span></p>
          <p class="cartao-pessoa__linha">📱 <span class="valor">${c.telefone}</span></p>
          <p class="cartao-pessoa__linha">🪪 <span class="valor">CPF ${c.cpf}</span></p>
        </div>
        <div class="cartao-pessoa__acoes">
          <button class="icone-acao" title="Editar cliente" aria-label="Editar ${c.nome}">✎</button>
          <button class="icone-acao" title="Remover cliente" aria-label="Remover ${c.nome}">🗑</button>
        </div>
      </article>
    `).join("");
  }

  function renderFuncionarios(seletor) {
    const container = $(seletor);
    if (!container) return;
    container.innerHTML = FUNCIONARIOS.map((f) => `
      <article class="cartao-pessoa">
        <div class="cartao-pessoa__avatar"><img src="../assets/img/${f.avatar}" alt="" loading="lazy"></div>
        <div class="cartao-pessoa__info">
          <p class="cartao-pessoa__nome">${f.nome}</p>
          <p class="cartao-pessoa__linha">📧 <span class="valor">${f.email}</span></p>
          <p class="cartao-pessoa__linha">📱 <span class="valor">${f.telefone}</span></p>
          <p class="cartao-pessoa__linha">💰 <span class="valor">${formatarMoeda(f.salario)}</span></p>
          <span class="cartao-pessoa__tag">${f.cargo}</span>
        </div>
        <div class="cartao-pessoa__acoes">
          <button class="icone-acao" title="Editar funcionário" aria-label="Editar ${f.nome}">✎</button>
          <button class="icone-acao" title="Remover funcionário" aria-label="Remover ${f.nome}">🗑</button>
        </div>
      </article>
    `).join("");
  }

  function renderLojas(seletor) {
    const container = $(seletor);
    if (!container) return;
    container.innerHTML = LOJAS.map((l) => `
      <article class="cartao-loja">
        <div class="cartao-loja__logo"><img src="../assets/img/${l.logo}" alt="Logo ${l.nome}" loading="lazy"></div>
        <p class="cartao-loja__nome">${l.nome}</p>
        <span class="cartao-loja__categoria">${l.categoria}</span>
        <p class="cartao-loja__estrelas" aria-label="${l.nota} de 5 estrelas">${"★".repeat(l.nota)}${"☆".repeat(5 - l.nota)}</p>
        <p class="cartao-loja__endereco">${l.endereco}</p>
      </article>
    `).join("");
  }

  function renderCupons(seletor) {
    const container = $(seletor);
    if (!container) return;
    container.innerHTML = CUPONS.map((c) => {
      const rotulo = c.tipo === "percentual" ? `${c.valor}%` : c.tipo === "frete" ? "FRETE" : formatarMoeda(c.valor);
      return `
      <article class="cartao-cupom">
        <div class="cartao-cupom__valor">${rotulo}<span>OFF</span></div>
        <div class="cartao-cupom__corpo">
          <p class="cartao-cupom__codigo">${c.codigo}</p>
          <p class="cartao-cupom__descricao">${c.descricao}</p>
          <p class="cartao-cupom__validade">Válido até ${c.validade} · ${c.quantidade} unidades disponíveis</p>
        </div>
      </article>
    `;
    }).join("");
  }

  /* ---------------------------------------------------------------------
     7. Página de produto (detalhe)
     --------------------------------------------------------------------- */
  function initProdutoDetalhe() {
    const raiz = $("[data-produto-detalhe]");
    if (!raiz) return;

    const params = new URLSearchParams(location.search);
    const id = Number(params.get("id")) || 1;
    const produto = PRODUTOS.find((p) => p.id === id) || PRODUTOS[0];

    $("#produto-nome").textContent = produto.nome;
    $("#produto-preco").textContent = formatarMoeda(produto.valorDetalhe);
    $("#produto-estoque").textContent = `${produto.quantidade} peças disponíveis`;
    document.title = `${produto.nome} — Xhopii`;

    const imagemPrincipal = $("#produto-imagem-principal");
    const miniaturas = $$(".produto-detalhe__miniaturas button");
    const botoesCor = $$(".seletor-cor button");
    const botoesTamanho = $$(".seletor-tamanho button");
    const selecionadoTexto = $("#tamanho-selecionado");

    function selecionarCor(cor) {
      miniaturas.forEach((b) => b.classList.toggle("ativo", b.dataset.cor === cor));
      botoesCor.forEach((b) => b.classList.toggle("ativo", b.dataset.cor === cor));
      const miniaturaAtiva = miniaturas.find((b) => b.dataset.cor === cor);
      const img = miniaturaAtiva ? miniaturaAtiva.querySelector("img") : null;
      if (img && imagemPrincipal) {
        imagemPrincipal.src = img.src;
        imagemPrincipal.alt = img.alt;
      }
    }

    miniaturas.forEach((btn) => {
      btn.addEventListener("click", () => selecionarCor(btn.dataset.cor));
    });

    botoesCor.forEach((btn) => {
      btn.addEventListener("click", () => selecionarCor(btn.dataset.cor));
    });

    botoesTamanho.forEach((btn) => {
      btn.addEventListener("click", () => {
        botoesTamanho.forEach((b) => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        if (selecionadoTexto) selecionadoTexto.textContent = btn.textContent.trim();
      });
    });

    const btnComprar = $("#btn-comprar");
    if (btnComprar) {
      btnComprar.addEventListener("click", () => showToast("Produto adicionado — compra simulada!", "sucesso"));
    }
  }

  /* ---------------------------------------------------------------------
     8. Init geral
     --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initFileInputs();
    initProdutoDetalhe();
  });

  // API pública usada pelos scripts inline de cada página
  window.Xhopii = {
    showToast,
    handleFormAuth,
    handleCadastro,
    renderProdutos,
    renderClientes,
    renderFuncionarios,
    renderLojas,
    renderCupons,
    PRODUTOS,
  };
})();
