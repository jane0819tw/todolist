console.clear()
// write your code here--------------------------------------------------------------
function addItem(text, className) {
  $alert.innerText = ''
  if (text.trim() === '') {
    $alert.innerHTML = 'please input a word. '
    $alert.style.color = '#f4fc00'
  } else {
    let type = className ? 'Done' : 'Todo'
    $alert.innerHTML = `add <b>${text}</b> succuess into <b>${type}</b> list`
    $alert.style.color = 'green'
  }
  if (text.trim()) {
    let newItem = document.createElement('li')
    newItem.innerHTML = `
    <label for="todo" class=${className}>${text}</label>
    <i class="delete fa fa-trash"></i>
    `
    className ? $donePanel.appendChild(newItem) : $todoPanel.appendChild(newItem)
    showWord()
  }
  $input.value = ''
}
// check show todo / done or not
function showWord() {
  // check to remove word or not
  // find panel node
  let $uls = $panels.querySelectorAll('ul')
  $uls.forEach(ul => {
    ul.previousElementSibling.className = ul.children.length === 0 ? 'd-none' : 'd-block'
    ul.parentElement.className = ul.children.length === 0 ? 'flex-0' : 'flex-1'
  })

  // cheak if it is last todo item
  $alert.style.fontStyle = 'normal'
  if ($todoPanel.children.length === 0) {
    $alert.innerHTML = `<b>AWESONE !YOU FINISHED</b>`
    $alert.style.color = 'blue'
    $alert.style.fontStyle = 'Italic'
  }
}

const $addBtn = document.querySelector('#addBtn')
const $panels = document.querySelector('#panels')
const $todoPanel = $panels.querySelector('#my-todo')
const $donePanel = $panels.querySelector('#my-done')
const $input = document.querySelector('input')
const $alert = document.querySelector('.alert-word')

const todoList = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']

for (let todo of todoList) {
  addItem(todo)
}
$addBtn.addEventListener('click', () => {
  let inputValue = document.querySelector('#newTodo').value
  addItem(inputValue)
})

$panels.addEventListener('click', evt => {
  // click delete icon
  if (evt.target.classList.contains('delete')) {
    // remove li
    evt.target.parentElement.remove()
    $alert.innerHTML = `delete <b>${evt.target.previousElementSibling.innerText}</b>`
    $alert.style.color = '#f24'
    showWord()
  }
  // click label in todo
  if (evt.target.tagName === 'LABEL' && !evt.target.classList.contains('checked')) {
    evt.target.parentElement.remove()
    addItem(evt.target.innerText, 'checked')
  }
})

window.addEventListener('keypress', evt => {
  if (evt.keyCode === 13) {
    addItem($input.value)
  }
})