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
    incomes() {
        //funcionalidade de somar as entradas
    },
    expenses() {
        //funcionalidade de somar as saídas
    },
    total() {
        //funcionalidade de total (entrada-saídas)
    },
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
        const html = `
     <td class="description">${transaction.description}</td>
     <td class="expense">${transaction.amount}</td>
     <td class="date">${transaction.date}</td>
     <td>
         <img src="arquivos/minus.svg">
     </td>
 `
        console.log(html)

        return html
    }
}
DOM.addTransaction(transactions[0])
DOM.addTransaction(transactions[1])
DOM.addTransaction(transactions[2])