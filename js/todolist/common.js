// Clone Function
import * as read from './read.js'
import * as update from './update.js'
import * as todoDelete from './delete.js';
export const TodoLS = "todo";
let todolistLastIDX = 0;

// todo list last index를 init 하는 함수
export function initTodolistLastIDX(lsData) {
  if(lsData) {
    todolistLastIDX = lsData.todolistLastIDX;
    // debugger;
    return;
  }
}
// todolistLastIDX 를 1 증가 시킨다.
export function addTodolistLastIDX() {
  todolistLastIDX++;
}
// return todolistLastIDX
export function gettodolistLastIDX() {
  return todolistLastIDX;
}

export function clone(source) {
  var target = {}
  for (let key in source) {
    if (source[key] != null && typeof source[key] === "object") {
      if(Array.isArray(source[key])) {
        target[key] = Array.from(source[key]);

        continue;
      }
      target[key] = clone(source[key]); // resursion
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// 이벤트를 모아놓은 함수 이다.
export function todoListEvents(itemContainerElements) {
  for(let i = 0; i < itemContainerElements.length; i++) {
    const todoElementDatasetID = Number(itemContainerElements[i].dataset['id']);
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
    
    // todolist - element에 마우스를 올렸을때 발생하는 이벤트
    itemContainerElements[i].addEventListener('mouseover', () => {
      /* 체크박스에 체크가 되었다면 이벤트 무시 */

      if(todoElementOBJ.text.classList.contains('check')) {
        todoElementOBJ.update.style['display'] = 'none';

        // debugger;
        return;
      }

      todoElementOBJ.update.style['display'] = 'inline-block';
    });

    // todolist - element에 마우스를 내렸을때 발생하는 이벤트
    itemContainerElements[i].addEventListener('mouseout', () => {
      if(todoElementOBJ.text.classList.contains('check'))
        return;

      todoElementOBJ.update.style['display'] = 'none';
    });

    // todolist - check box click event
    todoElementOBJ.checkbox.addEventListener('click', () => {
      update.updateLSCheck(todoElementDatasetID);

      // text안에 class name에 check가 있는지 확인
      if(todoElementOBJ.text.classList.contains('check')) { //true
        todoElementOBJ.text.classList.remove('check');
        todoElementOBJ.delete.style['display'] = 'none';
      } else {
        todoElementOBJ.text.classList.add('check');
        todoElementOBJ.delete.style['display'] = 'inline-block';
        todoElementOBJ.update.style['display'] = 'none';
      }
    });
    
    todoElementOBJ.delete.addEventListener('click', (e) => {
      let clickedTodoIDX = itemContainerElements[i].dataset['id'];
      todoDelete.deleteLsTodoList(clickedTodoIDX);
      // debugger;
    })
  } //for()
}

export function getListIDX(lsTodoListData, idx) {
  // debugger;
  
  for(let i = 0; i < lsTodoListData.length; i++) {
    if(lsTodoListData[i].id === idx) {
      return i;
    }
  }
}