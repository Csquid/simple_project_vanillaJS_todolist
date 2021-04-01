window.onload = () => {
  const TodoLocalStorage      = "todos";
  let   itemContainerElements = document.querySelector(".item-container");
  let   todolistLastIDX       = 0;

  if(loadLocalStorageTodoList() === null) {
    todolistLastIDX = 0;
  } else {
    init();
    todolistLastIDX = loadLocalStorageTodoList().length;
  }

  /* Local Storage 에서 데이터 셋팅하기 */
  // localStorage.setItem(TodoLocalStorage, JSON.stringify(todoListDatas));
  // localStorage.setItem(TodoLocalStorage, JSON.stringify([{id:2, todo: 'test2'}]));
  
  /* Read */

  // 최초 한번 Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
  function initPrintTodoList(parsedTodos) {
    for(let i = 0; i < parsedTodos.length; i++) {
      printTodoList(text);
    }
  }

  // 화면에 todolist 를 찍어내는 함수
  function printTodoList(todoText) {
    const itemContentElement   = document.querySelectorAll('.item-content')[0];
    const itemContainerElement = document.createElement('div');
    const todoCheckBoxElement  = document.createElement('input');
    const todoTextElement      = document.createElement('input');
    const updateButtonElement  = document.createElement('input');
    const deleteButtonElement  = document.createElement('input');
    
    itemContainerElement.className = 'item-container';
    
    todoCheckBoxElement.className = 'todo_checkbox';
    todoCheckBoxElement.type  = "checkbox";
      
    todoTextElement.type = 'text';
    todoTextElement.defaultValue = todoText;
    todoTextElement.readOnly = 'readOnly';
      
    updateButtonElement.className = 'update';
    updateButtonElement.type = 'button';
    updateButtonElement.value = '🦜';
    
    deleteButtonElement.className = 'delete';
    deleteButtonElement.type = 'button';
    deleteButtonElement.value = 'x';
    
    itemContainerElement.appendChild(todoCheckBoxElement);
    itemContainerElement.appendChild(todoTextElement);
    itemContainerElement.appendChild(updateButtonElement);
    itemContainerElement.appendChild(deleteButtonElement);
      
    itemContentElement.appendChild(itemContainerElement);
  }
  
  // 최초 한번 Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
  function initPrintTodoList(parsedTodos) {
    for(let i = 0; i < parsedTodos.length; i++) {
      printTodoList(parsedTodos[i].todo);
    }
  }

  // Local Storage에 있는 데이터들을 가지고 온다.
  function loadLocalStorageTodoList() {
    /* Local Storage 에서 데이터 꺼내오기 */
    let todos = localStorage.getItem(TodoLocalStorage);
    const parsedTodos = JSON.parse(todos);

    return parsedTodos;
  }

  // Run Read - 최초 1번만 실행되는 함수
  function readTodoList() {
    const parsedtodoDatas = loadLocalStorageTodoList();
    initPrintTodoList(parsedtodoDatas);
  }

  function init() {
    readTodoList();
    itemContainerElements = document.querySelectorAll(".item-container");
    todoListEvents(itemContainerElements);
    // debugger;
  }

  //Create
  const todoInputTextElement = document.querySelector('.add-todo input[type="text"]');
  const todoAddButton        = document.querySelector('.add-todo input[type="button"]');

  // todoInputText: 유저가 작성한 todo text data
  // todoOBJ: Local Storage 에 삽입할 todo 배열 객체
  // todoOBJ [{ id: 0, todo: 'someting', check: false } , ... ]
  function setCreate(todoInputText, todoOBJ) {
    localStorage.setItem(TodoLocalStorage, JSON.stringify(todoOBJ));
    // input - todo text 부분에 값을 빈 값으로 만들어줌
    todoInputTextElement.value = '';
    printTodoList(todoInputText);
    
    itemContainerElements = document.querySelectorAll(".item-container");
    let itemContainerElement = itemContainerElements[itemContainerElements.length - 1];
    let tempArray = [itemContainerElement];
    
    todoListEvents(tempArray);
  }

  // TodoList add 버튼을 '클릭' 했을시 발생하는 이벤트
  todoAddButton.addEventListener('click', () => {
    let todoInputText = todoInputTextElement.value;

    if(todoInputText == '') {
      // 비어있는 데이터는 추가할 수 없습니다.
      alert("You Can't add empty data.");
      return;
    }
    if(loadLocalStorageTodoList() === null) {
      setCreate(todoInputText, [{id: 0, todo: todoInputText, check: false}]);

      return;
    }

    // Local Storage 에서 TodoLocalStorage 를 조회하여 기존에 있는 데이터를 가져온다.
    const parsedtodoDatas = loadLocalStorageTodoList();
    // 기존 데이터를 Array.from 으로 데이터를 깊은 복사를 하여 데이터를 옮긴뒤 push하여 데이터를 추가해준다.
    // Array.from 을 사용하게 되면 기존 객체의 데이터를 건드리지 않고 복사해주며 복사된 객체에 데이터에 변경이 있어도 기존에 있던 객체는 Immutable(불변)하다. [Immutable: 불변성]
    const tempTodoListDatas = Array.from(parsedtodoDatas);
    // id: todolist last index + 1
    // todo: user todo
    tempTodoListDatas.push({
      id: todolistLastIDX+1,
      todo: todoInputText,
      check: false
    });

    todolistLastIDX += 1;
    console.log('original', parsedtodoDatas);
    console.log('temp: ', tempTodoListDatas);
    // 바뀐 데이터를 TodoLocalStorage 영역에 넣어버린다.

    // 1. 데이터를 반영해주기 위해선 페이지를 리로드 해준다
    // location.reload();
    // 2. 기존에 나와있는 리스트를 모두 지운뒤 리스트를 새로 뿌려준다.
    // 3. 그냥 리스트 밑에 달아버린다.
    
    setCreate(todoInputText, tempTodoListDatas);
    // PagedeleteTodoList();
  })

  //Update

  //Delete

  // 이벤트 처리's 함수
  // 이벤트를 모아놓은 함수 이다.
  function todoListEvents(itemContainerElements) {
    // itemContainerElements = document.querySelectorAll(".item-container");
  
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
  
      todoElementOBJ.checkbox.addEventListener('click', (e) => {
        console.log(todoElementOBJ.text.className);
        if(todoElementOBJ.text.className === '') {
          console.log('break');
          todoElementOBJ.text.className = 'check';
          todoElementOBJ.delete.style["display"] = 'inline-block';
          todoElementOBJ.update.style['display'] = 'none';
        } else {
          todoElementOBJ.text.className = '';
          todoElementOBJ.delete.style['display'] = 'none';
        }
      });
      
      itemContainerElements[i].addEventListener('mouseover', (e) => {
        /* 체크박스에 체크가 되었다면 이벤트 무시 */
  
        if(todoElementOBJ.text.className === 'check') {
          todoElementOBJ.update.style['display'] = 'none';
          return;
        }
  
        todoElementOBJ.update.style['display'] = 'inline-block';
      });
  
      itemContainerElements[i].addEventListener('mouseout', () => {
        if(todoElementOBJ.text.className === 'check')
          return;
  
        todoElementOBJ.update.style['display'] = 'none';
      });
    } //for()
  } // todoListEvents(
} //window.onload()