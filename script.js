//abrindo e fechando o modal
const Modal = {
    open() {
        //abrir modal, injeta a div modal-overlay active
        // o querySelector está pegando a classe modal-overlay e indo até a lista de classe e depois uso o método add. na classe active.

        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close() {
        //fechar modal, retiro a div modal-overlay active
        //mesma coisa do add, mas o método aqui é remove.
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    },

}
//criando objetos com os dados da table
const transactions =
    [{
        id: 1,
        description: 'Luz',
        amount: -30000,
        date: '01/03/2020'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '01/03/2020'
    },
    {
        id: 3,
        description: 'Aluguel',
        amount: -150000,
        date: '01/03/2020'
    },
    ]

//passo a passo:
// 1) somar as entradas
// 2) somar as saídas
// 3) entrada - saídas = total 

const Transaction = {
    //criou um atalho p/ todas as transacoes
    all: transactions,
    add(transaction){
Transaction.all.push(transaction)
App.reload()
    },
    //funcionalidade de somar as entradas
    incomes() { 
        let income = 0;
        //pegar todas as transacoes
        //para cada transacao, 
        Transaction.all.forEach(transactions =>{
        //se ela for maior que zero
        if(transactions.amount > 0) {
        //somar a uma variavel e retornar a variavel
        income = income + transactions.amount
        }
        })
        return income;
    },
    //funcionalidade de somar as saídas
    expenses() {
        let expense = 0;
        //pegar todas as transacoes
        //para cada transacao, 
        Transaction.all.forEach(transactions =>{
        //se ela for menor que zero
        if(transactions.amount < 0) {
        //somar a uma variavel e retornar a variavel
        expense = expense + transactions.amount
        }
        })
        return expense;  
    },
    //funcionalidade de total (entrada-saídas)
    total() {
    return Transaction.incomes() + Transaction.expenses()
    }
}

//eu preciso pegar os dados da table que estão no objeto e colocar lá no html: irei substituir os dados da table do html com os dados do js//
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        //se transaction.amount for menor que zero, será income, se não for, será expense, na tela: income ficará vermelho e expense verde, coloquei essa variável, interpolada na linha do html, onde aparece os números
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = Utils.formatCurrency(transaction.amount)
        const html = `
     <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td> 
     <td class="date">${transaction.date}</td>
     <td>
         <img src="arquivos/minus.svg">
     </td>
 `
        return html
    },
    
    //peguei o id da tag p do html e estou imprindo na tela, usando innerHTML

updateBalance() {
    document
    .getElementById('incomesDisplay') 
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
    .getElementById('expensesDisplay') 
    .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
    .getElementById('totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total()) 

  },
  clearTransactions() {
     DOM.transactionsContainer.innerHTML = "" 
  }
}


//funcionalidade para o sinal do número (- ou nada)
const Utils = {
formatCurrency(value){
//se o valor for medor que zero, entao retorna -, se não for, não irá retornar nada, ou seja, ficará sem o sinal
const signal = Number(value) < 0 ? "-" : ""

value = String(value).replace(/\D/g, "")
value = Number(value / 100)
//abaixo temos uma funcionalidade para transformar em moeda, primeiro arg a localização e o segundo as opções como objeto: style(currency-moeda) e currency-brl o tipo da moeda
value = value.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
})
return signal +value
}
}

//para cada elemento será executado, como argumento, uma funcionalidade
//enquanto o i for menor que 3, isso irá se repetir.
//for(let i =0; i<3; i++){

//} o forEach só é uma outra forma de escrever o que está acima
const App={
    init() {
Transaction.all.forEach(transaction => {
DOM.addTransaction(transaction)
})
DOM.updateBalance()
    },
reload() {
    DOM.clearTransactions()
    App.init()
},
}
App.init()


Transaction.add({
    id: 39,
description: 'oi',
amount: 200,
date: '23/02/2020',
})