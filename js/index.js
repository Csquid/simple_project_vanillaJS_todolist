import * as create from './todolist/create.js'
import * as read from   './todolist/read.js'
import * as common from './todolist/common.js'


window.onload = () => {
  let itemContainerElements = document.querySelector(".item-container");
  
  init();
  
  // 최초 한번 Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
  function initPrintTodoList(parsedTodos) {
    // 값이 비어있으면 return
    if(!parsedTodos)
      return;

    for(let i = 0; i < parsedTodos.todolist.length; i++) {
      read.printTodoList(parsedTodos.todolist[i]);
    }
  }

  // 화면에 뿌려진 todo list 데이터들에게 이벤트를 넣어준다.
  function initTodoListEvents() {
    // initPrintTodoList(lsData); 를 하게 되면 화면에 todo list를 뿌리고 그 todo list는 .item-container 이라는 div들 안에 들어가있다.
    itemContainerElements = document.querySelectorAll(".item-container");
    // .item-container 들의 값을 넘겨준다.
    common.todoListEvents(itemContainerElements);
  }

  // 최초 한번 실행되는 함수
  function init() {
    const lsData = read.loadLocalStorageTodoList();

    // init todolist last index
    common.initTodolistLastIDX(lsData);
    // Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
    initPrintTodoList(lsData);
    // 화면에 뿌려진 todo list 데이터들에게 이벤트를 넣어준다.
    initTodoListEvents();
    create.initAddClickEvent();
  }

} //window.onload()