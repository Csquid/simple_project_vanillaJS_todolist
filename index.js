window.onload = () => {
  const TodoLocalStorage      = "todo";
  let   itemContainerElements = document.querySelector(".item-container");
  let   todolistLastIDX       = 1;
  
  init();
  
  // Clone Function
  function clone(source) {
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
  
  /* Read */

  // 화면에 todolist 를 찍어내는 함수
  function printTodoList(todoOBJ) {
    const itemContentElement   = document.querySelectorAll('.item-content')[0];
    const itemContainerElement = document.createElement('div');
    const todoCheckBoxElement  = document.createElement('input');
    const todoTextElement      = document.createElement('input');
    const todoUpdateElement    = document.createElement('span');
    const todoDeleteElement    = document.createElement('span');
    const iconUpdateElement    = document.createElement('i');
    const iconDeleteElement    = document.createElement('i');

    itemContainerElement.className = 'item-container';
    itemContainerElement.dataset['id'] = todoOBJ.id
    
    todoCheckBoxElement.className = 'todo-checkbox';
    todoCheckBoxElement.type  = 'checkbox';
      
    todoTextElement.className = 'todo-text'
    todoTextElement.type = 'text';
    todoTextElement.defaultValue = todoOBJ.text;
    todoTextElement.readOnly = 'readOnly';
    
    todoUpdateElement.className = 'todo-update';
    iconUpdateElement.className = 'fas fa-pen-fancy';
    
    todoDeleteElement.className = 'todo-delete';
    iconDeleteElement.className = 'far fa-trash-alt';

    todoUpdateElement.appendChild(iconUpdateElement);
    todoDeleteElement.appendChild(iconDeleteElement);
    
    itemContainerElement.appendChild(todoCheckBoxElement);
    itemContainerElement.appendChild(todoTextElement);
    itemContainerElement.appendChild(todoUpdateElement);
    itemContainerElement.appendChild(todoDeleteElement);
      
    itemContentElement.appendChild(itemContainerElement);
  }
  
  // Local Storage에 있는 데이터들을 가지고 온다.
  function loadLocalStorageTodoList() {
    /* Local Storage 에서 데이터 꺼내오기 */
    let todos = localStorage.getItem(TodoLocalStorage);
    const parsedTodos = JSON.parse(todos);

    return parsedTodos;
  }

  // todo list last index를 init 하는 함수
  function initTodolistLastIDX(lsData) {
    if(lsData) {
      todolistLastIDX = lsData.todolistLastIDX;

      return;
    }
  }

  // 최초 한번 Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
  function initPrintTodoList(parsedTodos) {
    // 값이 비어있으면 return
    if(!parsedTodos)
      return;

    for(let i = 0; i < parsedTodos.todolist.length; i++) {
      printTodoList(parsedTodos.todolist[i]);
    }
  }

  // 화면에 뿌려진 todo list 데이터들에게 이벤트를 넣어준다.
  function initTodoListEvents() {
    // initPrintTodoList(lsData); 를 하게 되면 화면에 todo list를 뿌리고 그 todo list는 .item-container 이라는 div들 안에 들어가있다.
    itemContainerElements = document.querySelectorAll(".item-container");
    // .item-container 들의 값을 넘겨준다.
    todoListEvents(itemContainerElements);
  }

  // 최초 한번 실행되는 함수
  function init() {
    const lsData = loadLocalStorageTodoList();

    // init todolist last index
    initTodolistLastIDX(lsData);
    // Local Storage 에 있는 TodoList 정보를 가져와 뿌려준다.
    initPrintTodoList(lsData);
    // 화면에 뿌려진 todo list 데이터들에게 이벤트를 넣어준다.
    initTodoListEvents();
  }

  //Create
  const todoInputTextElement = document.querySelector('.add-todo input[type="text"]');
  const todoAddButton        = document.querySelector('.add-todo input[type="button"]');

  // todoInputText: 유저가 작성한 todo text와 외 정보들
  // todoAddedObject: Local Storage 에 삽입할 todo 배열 객체
  // todoAddedObject [{ id: 0, todo: 'someting', check: false } , ... ]
  function setCreate(todoObjectsBeAdded, todoAddedObject) {
    // TodoLocalStorage 영역에 데이터 추가
    // debugger;
    localStorage.setItem(TodoLocalStorage, JSON.stringify(todoAddedObject));
    // input - todo text 부분에 값을 빈 값으로 만들어줌
    todoInputTextElement.value = '';
    // 
    printTodoList(todoObjectsBeAdded);
    
    itemContainerElements = document.querySelectorAll(".item-container");
    // Last IDX Element 를 넘겨줌
    let itemContainerElement = itemContainerElements[itemContainerElements.length - 1];
    let tempArray = [itemContainerElement];
    
    todoListEvents(tempArray);
  }

  // TodoList add 버튼을 '클릭' 했을시 발생하는 이벤트
  todoAddButton.addEventListener('click', () => {
    let todoInputText = todoInputTextElement.value;
    // Local Storage 에서 TodoLocalStorage 를 조회하여 기존에 있는 데이터를 가져온다.
    let lsData        = loadLocalStorageTodoList();

    if(todoInputText == '') {
      // 비어있는 데이터는 추가할 수 없습니다.
      alert("You Can't add empty data.");
      return;
    }
    
    if(lsData === null) {
      const tempTodoList = { id: 0, text: todoInputText, check: false };
      const todoObjectsBeAdded = { 
        todolistLastIDX: 0, 
        todolist: [tempTodoList]
      };
      setCreate(tempTodoList, todoObjectsBeAdded);

      return;
    }

    // 기존 데이터를 Array.from 으로 데이터를 깊은 복사를 하여 데이터를 옮긴뒤 push하여 데이터를 추가해준다.
    // Array.from 을 사용하게 되면 기존 객체의 데이터를 건드리지 않고 복사해주며 복사된 객체에 데이터에 변경이 있어도 기존에 있던 객체는 Immutable(불변)하다. [Immutable: 불변성]
    const tempTodoListDatas = clone(lsData);
    // const tempTodoListDatas = Array.from(lsData);
    // id: todolist last index + 1
    // todo: user todo
    const todoObjectsBeAdded = { id: todolistLastIDX+1, text: todoInputText, check: false };
    
    tempTodoListDatas.todolist.push(todoObjectsBeAdded);
    todolistLastIDX += 1;

    console.log('original', lsData);
    console.log('temp: ', tempTodoListDatas);
    // 바뀐 데이터를 TodoLocalStorage 영역에 넣어버린다.

    // 1. 데이터를 반영해주기 위해선 페이지를 리로드 해준다
    // location.reload();
    // 2. 기존에 나와있는 리스트를 모두 지운뒤 리스트를 새로 뿌려준다.
    // 3. 그냥 리스트 밑에 달아버린다.
    
    // tempTodoListDatas: original todo object에서 새로 추가된 데이터를 삽입 한 후 그 객체를 넘겨준다.
    setCreate(todoObjectsBeAdded, tempTodoListDatas);
    // PagedeleteTodoList();
  })

  //Update

  //Delete

  // 이벤트 처리's 함수
  // 이벤트를 모아놓은 함수 이다.
  function todoListEvents(itemContainerElements) {
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

      todoElementOBJ.checkbox.addEventListener('click', () => {
        // console.log(todoElementOBJ.text.className);
        // text안에 class name에 check가 있는지 확인
        if(todoElementOBJ.text.classList.contains('check')) { //true
          todoElementOBJ.text.classList.remove('check');
          todoElementOBJ.delete.style['display'] = 'none';
        } else {
          todoElementOBJ.text.classList.add('check');
          todoElementOBJ.delete.style["display"] = 'inline-block';
          todoElementOBJ.update.style['display'] = 'none';
        }
      });
      
      todoElementOBJ.delete.addEventListener('click', (e) => {
        console.log(itemContainerElements[i].dataset['id']);
        debugger;
      })
      

      
    } //for()
  } // todoListEvents(
} //window.onload()