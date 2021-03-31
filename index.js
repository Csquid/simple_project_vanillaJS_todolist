window.onload = () => {
  let itemContainerElements = document.querySelectorAll(".item-container");
  const TodoLocalStorage = "todos";
  const todoListDatas = [
    {id: 0, todo: 'Study React Library'},
    {id: 1, todo: 'Read an Book'},
    {id: 2, todo: 'Go to School'}
  ];
  
  /* Local Storage 에서 데이터 셋팅하기 */
  localStorage.setItem(TodoLocalStorage, JSON.stringify(todoListDatas));
  // localStorage.setItem(TodoLocalStorage, JSON.stringify([{id:2, todo: 'test2'}]));
  /* Local Storage 에서 데이터 꺼내오기 */
  let todos = localStorage.getItem(TodoLocalStorage);
  const parsedTodos = JSON.parse(todos);

  //Read
  
  for(let i = 0; i < parsedTodos.length; i++) {
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
    todoTextElement.defaultValue = parsedTodos[i].todo;
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
  //Create

  //Update

  //Delete

  itemContainerElements = document.querySelectorAll(".item-container");

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
      if(todoElementOBJ.text.className === '') {
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

  }

}