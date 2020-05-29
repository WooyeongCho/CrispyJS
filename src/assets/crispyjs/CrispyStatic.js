const CrispyStatic = (() => {
    let CrispyStatic = {}
    CrispyStatic.Utils = {
        generateID() {
            let length = 6;
            let id = '';
            for (let i = 0; i < length; i++) {
              let code = Math.floor(Math.random() * (55203 - 44032)) + 44032;
              let lastChar = (code - 0xAC00) % (21 * 28) % 28;
              code = code - lastChar;
              id += String.fromCharCode(code);
            } 
            return id;
        },

        appendChild(target, htmlText) {
            let element = document.createElement('div');
            let id = VlokeStatic.Utils.generateId();
            let oldId = element.getAttribute('id');
            element.setAttribute('id', id);
            target.appendChild(element);
            document.getElementById(id).outerHTML = htmlText;
            return target;
        },

        Error(e) {
            console.error('Crispy Engine Error: ', e);
        },

        isNumber(num) {
            if (typeof num === 'number') return true
            else return typeof num === 'string' && /^-?\d+\.?\d*$/.test(num);
        }
    };
    CrispyStatic.Color = {
        block: {
            eventBlock: {
                default: '#22B14C', 
                darken: '#1B9E41',
                text: '#FFFFFF',
            },
            actionBlock: {
                default: '#6495ED',
                darken: '#3465CD',
                text: '#FFFFFF',
            }, 
        }
    };
    return CrispyStatic;
})()