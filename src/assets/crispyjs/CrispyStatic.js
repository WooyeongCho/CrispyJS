const CrispyStatic = (() => {
    let CrispyStatic = {}
    CrispyStatic.Utils = {
        // 블록 고유의 (한글) ID를 생성하는 함수
        generateID() {
            // 한글 ID 생성 코드는 D.QSR님의 코드를 참고했습니다
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

        refresh() {
            var blockSkeletons = document.querySelectorAll(".blockSkeleton");
            for (var value of blockSkeletons) {
                console.log(value); // 10, 20, 30
            }
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

        appendBlock(type) { // TODO: 일단 테스트용으로 type 매개변수를 받아 블록 모양을 결정하지만, 후에는 블럭 각각 정보를 담는 오브젝트를 만들어 거기서 블록 모양을 가져올 예정이다.
            let playground = document.querySelector("#playground");
            let blockPath = this.generateBlockPath(type, 300);
            let html = `
            <g class="blockGroup" transform="translate(0,0)" > 
                <g>
                    <path d="${blockPath}" fill="#F24977" stroke="#CD3D64" stroke-width="2" class="blockSkeleton draggable" transform="translate(0,0)"></path>
                    <foreignObject x="15" y="12.5" width="20" height="20" class="draggable">
                        <i class="fas fa-share draggable" style="color:white; font-size:15px;"></i>
                    </foreignObject>
                    
                </g>   
            </g>`
            playground.insertAdjacentHTML("beforeend", html)
            return ;
        },

        // 해당 타입과 길이의 블록 Svg Path를 리턴
        generateBlockPath(type, width) {
            let blockPath = {
                "eventBlock": `m 0 20 c 0 0 0 -20 20 -20 h ${width} c 0 0 20 0 20 20 c 0 0 0 20 -20 20 h -20 h -${width} z`, // 이벤트 블록 (시작했을 때 등)
                "scriptBlock": `m 0 0 h 20 h ${width} c 0 0 20 0 20 20 c 0 0 0 20 -20 20 h -20 h -${width} z`, // 스크립트 블록 (~를 하기 등)
                "defBlock": `m 0 0 h 20 h ${width} c 0 0 20 0 20 20 c 0 0 0 20 -20 20 h -${width} c 0 0 -20 0 -20 -20 z`, // 밑에 코드가 필요한 블록 (반복하기, 만약에 ~이라면 등)
                "paramBlock": `m 17 10 c 0 0 0 -3 3 -3 h ${width} c 0 0 3 0 3 3 v 20 c 0 0 0 3 -3 3 h -${width} c 0 0 -3 0 -3 -3 z` // 파라미터 블록, 매개변수를 넣는 블록
            }
            return blockPath[type];
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