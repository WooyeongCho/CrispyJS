let Crispy = {}
let selectedElement, offset, transform, myCoord;
let playground = document.querySelector('#playground');

Crispy.engine = {
  init() {
    initDragEvent(playground);
  //   playground.innerHTML +=
  //   `<defs>
  //   <pattern id="polka-dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">                      
  //       <circle fill="#393939" cx="25" cy="25" r="3">
  //       </circle>
  //   </pattern>
  //   <filter id="shadow">
  //       <feDropShadow dx="0" dy="0" stdDeviation="5" 
  //           flood-color="yellow" flood-opacity="1"/>
  //   </filter>
    
  //   <filter id="outline">
  //       <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2"></feMorphology>
  //       <feFlood flood-color="yellow" flood-opacity="1" result="PINK"></feFlood>
  //       <feComposite in="PINK" in2="DILATED" operator="in" result="OUTLINE"></feComposite>
        
  //       <feMerge>
  //       <feMergeNode in="OUTLINE" />
  //       <feMergeNode in="SourceGraphic" />
  //       </feMerge>
  //   </filter>
  //   </defs>
  //   <rect x="0" y="0" width="100%" height="100%" fill="#262626"></rect> 
  // <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>`



    console.log("%c  Crispy Engine ON  ", "color: white; background-color: purple; font-size:2em;");
    console.log("%c  Made by Wily Youth(wy24)  ", "color: purple; background-color: white; font-size:1.5em;");
  }
}



const initDragEvent = target => {
  var svg = target;
  
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  svg.addEventListener('touchstart', startDrag);
  svg.addEventListener('touchmove', drag);
  svg.addEventListener('touchend', endDrag);
  svg.addEventListener('touchleave', endDrag);
  svg.addEventListener('touchcancel', endDrag);

  function startDrag(evt) {
    if (evt.target.classList.contains('draggable')) {
      selectedElement = evt.target.closest(".scriptBlock"); // 찾는거
      offset = getMousePosition(evt);
      // Get all the transforms currently on this element
      var transforms = selectedElement.transform.baseVal;
      // Ensure the first transform is a translate transform
      if (transforms.length === 0 ||
        transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
        // Create an transform that translates by (0, 0)
        var translate = svg.createSVGTransform();
        translate.setTranslate(0, 0);
        // Add the translation to the front of the transforms list
        selectedElement.transform.baseVal.insertItemBefore(translate, 0);
      }
      // Get initial translation amount
      //console.log("x: " + .x + " Y: " + selectedElement.getBBox.y)

      // offset.x -= transform.matrix.e;
      //offset.y -= transform.matrix.f;
      transform = transforms.getItem(0);
      myCoord = selectedElement.getBoundingClientRect();
      //console.log("tr x" + transform.matrix.e + ", tr y" + transform.matrix.f + ", myc x" + myCoord.x + ", myc y" + (myCoord.y - 64)) //d이거 주목
      offset.x -= myCoord.x;
      offset.y -= myCoord.y - 64; // 이거 처음 블록도 y 좌표 이상하게 드래그 돼? 되 서 64 뺌
      //console.log("tr x" + transform.matrix.e + ", tr y" + transform.matrix.f + ", myc x" + myCoord.x + ", myc y" + (myCoord.y - 64)) //d이거 주목
      transform.setTranslate(myCoord.x, myCoord.y - 64)

      var playgroundElement = document.getElementById('playground');
      var playgroundChilds = document.getElementById('playground').childNodes;
      var i = playgroundChilds.length;
      selectedElement.setAttribute('filter', 'url(#outline)')
      selectedElement.setAttribute('opacity', '0.8')
      while (i--) {

        playgroundElement.appendChild(selectedElement);
      }

    }
  }
  function drag(evt) {
    if (selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);
      transform.setTranslate(coord.x - offset.x, coord.y - offset.y);
    }
  }
  function endDrag(evt) {
    if (selectedElement) {
      selectedElement.setAttribute('filter', '')
      selectedElement.setAttribute('opacity', '1')
      selectedElement = null;
    }
  }

  function getMousePosition(evt) {
    var CTM = svg.getScreenCTM();
    if (evt.touches) { evt = evt.touches[0]; }
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }
}

Crispy.engine.init();
console.log(CrispyStatic.Utils.generateID())
