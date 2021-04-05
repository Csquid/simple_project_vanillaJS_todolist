import * as read from './read.js'
import * as common from './common.js'

const todoInputTextElement  = document.querySelector('.add-todo input[type="text"]');
const todoAddButton         = document.querySelector('.add-todo input[type="button"]');
let   itemContainerElements = document.querySelector(".item-container");
function setCreate(todoObjectsBeAdded, todoAddedObject) {
  // TodoLocalStorage 영역에 데이터 추가
  // debugger;
  localStorage.setItem(common.TodoLS, JSON.stringify(todoAddedObject));
  // input - todo text 부분에 값을 빈 값으로 만들어줌
  todoInputTextElement.value = '';

  read.printTodoList(todoObjectsBeAdded);
  
  itemContainerElements = document.querySelectorAll(".item-container");
  // Last IDX Element 를 넘겨줌
  let itemContainerElement = itemContainerElements[itemContainerElements.length - 1];
  let tempArray = [itemContainerElement];
  
  common.todoListEvents(tempArray);
}

export function initAddClickEvent() {    
  todoAddButton.addEventListener('click', () => {
    let todoInputText = todoInputTextElement.value;
    // Local Storage 에서 TodoLocalStorage 를 조회하여 기존에 있는 데이터를 가져온다.
    let lsData        = read.loadLocalStorageTodoList();
  
    if(todoInputText == '') {
      // 비어있는 데이터는 추가할 수 없습니다.
      alert("You Can't add empty data.");
      return;
    }
    
    //데이터가 없으면
    if(lsData === null) {
      const tempTodoList = { id: 1, text: todoInputText, check: false };
      const todoObjectsBeAdded = { 
        todolistLastIDX: 1,
        todolist: [tempTodoList]
      };
      setCreate(tempTodoList, todoObjectsBeAdded);
  
      return;
    }
  
    // 기존 데이터를 Array.from 으로 데이터를 깊은 복사를 하여 데이터를 옮긴뒤 push하여 데이터를 추가해준다.
    // Array.from 을 사용하게 되면 기존 객체의 데이터를 건드리지 않고 복사해주며 복사된 객체에 데이터에 변경이 있어도 기존에 있던 객체는 Immutable(불변)하다. [Immutable: 불변성]
    const tempTodoListDatas = common.clone(lsData);
    // const tempTodoListDatas = Array.from(lsData);
    // id:   todolist last index + 1
    // todo: user todo
    common.addTodolistLastIDX();
    const todolistLastIDX = common.gettodolistLastIDX();
    const todoObjectsBeAdded = { id: todolistLastIDX, text: todoInputText, check: false };
    
    tempTodoListDatas.todolistLastIDX = todolistLastIDX;
    tempTodoListDatas.todolist.push(todoObjectsBeAdded);
  
    // tempTodoListDatas: original todo object에서 새로 추가된 데이터를 삽입 한 후 그 객체를 넘겨준다.
    setCreate(todoObjectsBeAdded, tempTodoListDatas);
  })
}
