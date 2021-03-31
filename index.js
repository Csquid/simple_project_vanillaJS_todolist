window.onload = () => {
  const itemContainerElements = document.querySelectorAll(".item-container");

  for(let i = 0; i < itemContainerElements.length; i++) {
    const todoElementsChildren = itemContainerElements[i].children;
    const todoElementOBJ = {
      checkbox: null,
      text:     null,
      update:   null,
      delete:   null        
    }
    const todoObjectKeys = Object.keys(todoElementOBJ);

    for(let j = 0; j < todoObjectKeys.length; j++) {
      todoElementOBJ[todoObjectKeys[j]] = todoElementsChildren[j];
    }
    // firstElementChild 첫번째 자식을 찾는다
    // nextElementSibling 다음 형제를 찾는다

    todoElementOBJ.checkbox.addEventListener('click', (e) => {
      if(todoElementOBJ.text.className === "") {
        todoElementOBJ.text.className = "check";
        todoElementOBJ.delete.style["display"] = "inline-block";
        todoElementOBJ.update.style['display'] = 'none';
      } else {
        todoElementOBJ.text.className = "";
        todoElementOBJ.delete.style["display"] = "none";
      }
    });
    
    itemContainerElements[i].addEventListener('mouseover', (e) => {
      /* 체크박스에 체크가 되었다면 이벤트 무시*/

      if(todoElementOBJ.text.className === 'check') {
        todoElementOBJ.update.style['display'] = 'none';
        return;
      }

      todoElementOBJ.update.style['display'] = 'inline-block';
    });

    itemContainerElements[i].addEventListener('mouseout', () => {
      // if(todoElementOBJ.text.className === 'check')
      //   return;

      todoElementOBJ.update.style['display'] = 'none';
    });

  }

}