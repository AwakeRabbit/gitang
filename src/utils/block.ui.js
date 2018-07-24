export default class UIBlocker {
    static checkBlock() {
        if (document.querySelectorAll('#ui-blocker').length < 1) {
            self.blocker = document.createElement('div')
            blocker.setAttribute('id', 'ui-blocker')
            document.body.appendChild(blocker)
        }
    }

    static block() {
        this.checkBlock();
        self.blocker.classList.remove('visible')        
        self.blocker.classList.add('visible');
    }

    static unblock() {
        this.checkBlock();
        if (self.blocker.classList.contains('visible')) {
            self.blocker.classList.add('hiding')
            self.blocker.classList.remove('visible')
        }
        
    }
}