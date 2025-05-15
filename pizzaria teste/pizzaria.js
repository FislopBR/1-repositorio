let pizzaria = []


function mostrarsecao(secao) {
    //esconder todas as seções
    document.getElementById("cadastro").classList.add("hidden");
    document.getElementById("consulta").classList.add("hidden");
    document.getElementById("pedido").classList.add("hidden");

    //mostrar a seção desejada
    document.getElementById(secao).classList.remove("hidden");
}

function adicionarPizza() {
   const pizza = document.getElementById("pizza").value;
   const preco = document.getElementById("preco").value;
   const ingredientes = document.getElementById("ingredientes").value;

   if (pizza && preco && ingredientes) {
         pizzaria.push({pizza, preco, ingredientes});
         document.getElementById("pizza").value = "";
         document.getElementById("preco").value = "";
         document.getElementById("ingredientes").value = "";
         atualizarlista();
         alert("Pizza cadastrada com sucesso!");
        } else {
            alert("Preencha todos os campos!");
        }
    }

function buscarpizza() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const resultado = pizzaria.filter((item) =>
        item.pizza.toLowerCase().includes(busca)
    );
    atualizarlista(resultado); // Passa o resultado filtrado para a função
}

function atualizarlista(lista = pizzaria) {
    const tabela = document.getElementById("lista de pizza");
    tabela.innerHTML = ""; // Limpa a tabela antes de exibir os resultados

    lista.forEach((item) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.pizza}</td>
            <td>${item.preco}</td>
            <td>${item.ingredientes}</td>
        `;
        tabela.appendChild(linha);
    });
}