let input = document.getElementById("input");
let btn = document.getElementById("btn");
let lists = document.getElementById("list-box");

getData();
function getData() {
  return fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos")
    .then((resp) => resp.json())
    .then((data) =>
      data.todos.forEach((e) => {
        lists.innerHTML += `<li  style = '${e.update && 'text-decoration: line-through'}'>
        <p>${e.title}
        <span onclick='updateTodo(${JSON.stringify(e)})'>Update</span>
        <i class="fa-solid fa-xmark" onclick="deleteTodo('${e._id}')"></i>
        </p>
             </li>
             `;
      })
    );
}

function postTodo() {
  fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos",
    {
      method: "POST",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({
        title: input.value,
        completed: false,
      }),
    })
    .then(res=> {
        if(res.status === 201){
            lists.innerHTML = '';
            input.value = '';
            getData()
        }
    })
    .catch(err => console.log("error"));
}

function deleteTodo(id){
    fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${id}`,
    {
        method: "DELETE"
    })
    .then(res=>{
        if (res.status === 200) {
            lists.innerHTML = '';
            getData()
            
        }
    })
}

function updateTodo(value){
fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${value._id}`,
{
    method:"PUT",
    headers :{'Content-Type' : "application/json"},
    body: JSON.stringify({ ...value, completed: value.completed == false ? true:false})
})
.then(res=>{
    if (res.status === 200) {
        lists.innerHTML = '';
        getData()
    }
})

}


btn.addEventListener("click", postTodo);


