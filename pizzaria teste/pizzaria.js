let pizzaria = [];

function fazerLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    if (usuario === 'admin' && senha === '1234') {
        window.location.href = 'pizzaria.html';
    } else {
        document.getElementById('mensagem-erro').innerText = 'Usuário ou senha inválidos!';
    }
}

function mostrarsecao(secao) {
    ["cadastro", "consulta", "pedido"].forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });
    document.getElementById(secao).classList.remove("hidden");
}

function adicionarPizza() {
    const pizza = document.getElementById("pizza").value;
    const preco = document.getElementById("preco").value;
    const ingredientes = document.getElementById("ingredientes").value;
    if (pizza && preco && ingredientes) {
        pizzaria.push({ pizza, preco, ingredientes });
        document.getElementById("pizza").value = "";
        document.getElementById("preco").value = "";
        document.getElementById("ingredientes").value = "";
        atualizarlista();
        atualizarSelectPizzas();
        alert("Pizza cadastrada com sucesso!");
    } else {
        alert("Preencha todos os campos!");
    }
}

window.onload = function() {
    atualizarSelectPizzas();
    // Atualiza valor do pedido ao mudar pizza ou quantidade
    const pizzaSel = document.getElementById("pizzaPedido");
    const qtdInput = document.getElementById("quantidade");
    if (pizzaSel) pizzaSel.onchange = atualizarValorPedido;
    if (qtdInput) qtdInput.oninput = atualizarValorPedido;
};

function buscarpizza() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const resultado = pizzaria.filter(item =>
        item.pizza.toLowerCase().includes(busca)
    );
    atualizarlista(resultado);
}

function atualizarlista(lista = pizzaria) {
    const tabela = document.getElementById("lista de pizza");
    tabela.innerHTML = "";
    lista.forEach(item => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.pizza}</td>
            <td>${item.preco}</td>
            <td>${item.ingredientes}</td>
        `;
        tabela.appendChild(linha);
    });
}

function atualizarSelectPizzas() {
    const select = document.getElementById("pizzaPedido");
    if (!select) return;
    select.innerHTML = "";
    pizzaria.forEach((item, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = item.pizza;
        select.appendChild(option);
    });
    atualizarValorPedido();
}

function atualizarValorPedido() {
    const pizzaIndex = document.getElementById("pizzaPedido").value;
    const quantidade = document.getElementById("quantidade").value;
    const valorSpan = document.getElementById("valorPedido");
    if (pizzaIndex === "" || pizzaria.length === 0) {
        valorSpan.textContent = "";
        return;
    }
    const pizza = pizzaria[pizzaIndex];
    if (!pizza) {
        valorSpan.textContent = "";
        return;
    }
    const preco = parseFloat(pizza.preco);
    const qtd = parseInt(quantidade) || 1;
    const total = preco * qtd;
    valorSpan.textContent = `Valor total: R$ ${total.toFixed(2)}`;
}

function fazerPedido() {
    const nome = document.getElementById("nomeCliente").value;
    const pizzaIndex = document.getElementById("pizzaPedido").value;
    const quantidade = document.getElementById("quantidade").value;
    const mensagem = document.getElementById("mensagemPedido");
    if (!nome || pizzaIndex === "" || quantidade < 1) {
        mensagem.style.color = "red";
        mensagem.textContent = "Preencha todos os campos corretamente!";
        return;
    }
    const pizzaEscolhida = pizzaria[pizzaIndex];
    mensagem.style.color = "green";
    mensagem.textContent = `Pedido realizado! ${nome}, você pediu ${quantidade} pizza(s) de ${pizzaEscolhida.pizza}.`;
    atualizarValorPedido();
}