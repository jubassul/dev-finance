//abrindo e fechando o modal
const Modal = {
  open() {
    //abrir modal, injeta a div modal-overlay active
    // o querySelector está pegando a classe modal-overlay e indo até a lista de classe e depois uso o método add. na classe active.

    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //fechar modal, retiro a div modal-overlay active
    //mesma coisa do add, mas o método aqui é remove.
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};
//guardando as informações
const Storage ={
  get () {
  return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
  },
  set (transactions) {
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
  }
  }

//passo a passo:
// 1) somar as entradas
// 2) somar as saídas
// 3) entrada - saídas = total

const Transaction = {
  all: Storage.get(),
  //funcionalidade de add transacoes
  add(transaction) {
    Transaction.all.push(transaction);
    App.reload();
  },
  //funcionalidade de remover transações
  remove(index) {
    Transaction.all.splice(index, 1);

    App.reload();
  },

  //funcionalidade de somar as entradas
  incomes() {
    let income = 0;
    //pegar todas as transacoes
    //para cada transacao,
    Transaction.all.forEach((transactions) => {
      //se ela for maior que zero
      if (transactions.amount > 0) {
        //somar a uma variavel e retornar a variavel
        income = income + transactions.amount;
      }
    });
    return income;
  },
  //funcionalidade de somar as saídas
  expenses() {
    let expense = 0;
    //pegar todas as transacoes
    //para cada transacao,
    Transaction.all.forEach((transactions) => {
      //se ela for menor que zero
      if (transactions.amount < 0) {
        //somar a uma variavel e retornar a variavel
        expense = expense + transactions.amount;
      }
    });
    return expense;
  },
  //funcionalidade de total (entrada-saídas)
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

//eu preciso pegar os dados da table que estão no objeto e colocar lá no html: irei substituir os dados da table do html com os dados do js//
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),
  //adicionar os dados html da table
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction,index) {
    //se transaction.amount for menor que zero, será income, se não for, será expense, na tela: income ficará vermelho e expense verde, coloquei essa variável, interpolada na linha do html, onde aparece os números
    const CSSclass = transaction.amount > 0 ? "income" : "expense";
    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
     <td class="description">${transaction.description}</td>
    <td class="${CSSclass}">${amount}</td> 
     <td class="date">${transaction.date}</td>
     <td>
     <img onclick="Transaction.remove(${index})"src="arquivos/minus.svg">
     </td>
     `;
    return html;
    //peguei o id da tag p do html e estou imprindo na tela, usando innerHTML
  },
  //atualizar os valores das divs
  updateBalance() {
    document.getElementById("incomesDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expensesDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },
  //limpar os dados da tela
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

//formatar moeda
const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;
    return value;
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },
  formatCurrency(value) {
    //se o valor for medor que zero, entao retorna -, se não for, não irá retornar nada, ou seja, ficará sem o sinal
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");
    value = Number(value / 100);
    //abaixo temos uma funcionalidade para transformar em moeda, primeiro arg a localização e o segundo as opções como objeto: style(currency-moeda) e currency-brl o tipo da moeda
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
};

const Form = {
  //conexão entre o html e o js, estou pegando cada um dos inputs
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  //pegar os valores do input
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    };
  },
  //validar esses valores
  validateFields() {
    const { description, amount, date } = Form.getValues();
    //verificando se eles estão vazios
    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por Favor, preencha todos os campos");
    }
  },

  //salvar os dados do form
  FormatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    return {
      description,
      amount,
      date,
    };
  },
  saveTransaction(transaction) {
    Transaction.add(transaction);
  },
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },
  submit(event) {
    event.preventDefault();
    //capturar o erro disparado pelo throw
    try {
      //verificar se os campos estão válidos
      Form.validateFields();
      //pegar transação formatada
      const trasaction = Form.FormatValues();
      //salvar transação
      Form.saveTransaction(trasaction);
      //limpar
      Form.clearFields();
      //fecha modal
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

//para cada elemento será executado, como argumento, uma funcionalidade
//enquanto o i for menor que 3, isso irá se repetir.
//for(let i =0; i<3; i++){

//} o forEach só é uma outra forma de escrever o que está acima
const App = {
  init() {
    Transaction.all.forEach((transaction, index) => {
      DOM.addTransaction(transaction, index);
    });
    DOM.updateBalance();
    Storage.set(Transaction.all)
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};
App.init();
