//abrindo e fechando o modal
const Modal = {
    open() {
        //abrir modal, injeta a div modal-overlay active
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close() {
        //fechar modal, retiro a div modal-overlay active
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    },

}