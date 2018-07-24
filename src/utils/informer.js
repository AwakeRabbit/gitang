export default class Informer {
    static checkBlock() {
        if (document.querySelectorAll('#informer').length < 1) {
            self.informer = document.createElement('div')
            informer.setAttribute('id', 'informer')
            document.body.appendChild(informer)
        }
    }

    static inform(text) {
        this.checkBlock()
        if (self.informer.classList.contains('visible')) {
            setTimeout(() => this.inform(text), 3000)
            return false;
        }
        self.informer.innerText = text
        self.informer.classList.add('visible')
        self.informer.classList.remove('hiding')
        setTimeout(() => {
            self.informer.classList.add('hiding');
            self.informer.classList.remove('visible');}, 500)
    }
} 