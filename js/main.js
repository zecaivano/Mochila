const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach ((elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento)=> {
    evento.preventDefault(); //Previno o comportamento padrão que é enviar os dados a um servidor

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1: 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    
    localStorage.setItem('itens', JSON.stringify(itens)); //Local storage trabalha somente com strings
    
    nome.value = "";
    quantidade.value = "";

})

function criaElemento(item) {
    //   <li class="item"><strong>1</strong>Adaptador de tomada</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item"); //Adiciona classe item ao novoItem

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;  //como estou me referindo à tag do elemento, eu coloco o innerHTML
    numeroItem.dataset.id = item.id;    //Crio um novo ID baseado no data-atributes
    novoItem.appendChild(numeroItem);   //Adiciona um filho numeroItem ao elemento novoItem
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id))
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento (tag, id) {
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id),1)
    localStorage.setItem('itens', JSON.stringify(itens)); //Local storage trabalha somente com strings
}