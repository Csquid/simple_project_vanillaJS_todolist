const TodoLocalStorage = "todo";
// Local Storage에 있는 데이터들을 가지고 온다.
export function loadLocalStorageTodoList() {
  /* Local Storage 에서 데이터 꺼내오기 */
  let todos = localStorage.getItem(TodoLocalStorage);
  const parsedTodos = JSON.parse(todos);

  return parsedTodos;
}

// 화면에 todolist 를 찍어내는 함수
export function printTodoList(todoOBJ) {
  const itemContentElement   = document.querySelectorAll('.item-content')[0];
  const itemContainerElement = document.createElement('div');
  const todoCheckBoxElement  = document.createElement('input');
  const todoTextElement      = document.createElement('input');
  const todoUpdateElement    = document.createElement('span');
  const todoDeleteElement    = document.createElement('span');
  const iconUpdateElement    = document.createElement('i');
  const iconDeleteElement    = document.createElement('i');

  itemContainerElement.classList.add('item-container');
  itemContainerElement.dataset['id'] = todoOBJ.id
  
  if(todoOBJ.check) {
    todoCheckBoxElement.checked = true;
    todoTextElement.classList.add('check');
    todoDeleteElement.style.display = 'inline-block';
  }
  
  todoCheckBoxElement.classList.add('todo-checkbox');
  todoCheckBoxElement.type  = 'checkbox';
  
  todoTextElement.classList.add('todo-text');
  todoTextElement.type = 'text';
  todoTextElement.defaultValue = todoOBJ.text;
  todoTextElement.readOnly = 'readOnly';
  
  todoUpdateElement.classList.add('todo-update');
  iconUpdateElement.classList.add('fas', 'fa-pen-fancy');
  
  todoDeleteElement.classList.add('todo-delete');
  iconDeleteElement.classList.add('far', 'fa-trash-alt');

  todoUpdateElement.appendChild(iconUpdateElement);
  todoDeleteElement.appendChild(iconDeleteElement);
  
  itemContainerElement.appendChild(todoCheckBoxElement);
  itemContainerElement.appendChild(todoTextElement);
  itemContainerElement.appendChild(todoUpdateElement);
  itemContainerElement.appendChild(todoDeleteElement);
    
  itemContentElement.appendChild(itemContainerElement);
}