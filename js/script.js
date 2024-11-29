var users = [
  { name: "aya", isStudent: true, id: 1 },
  { name: "ali", isStudent: false, id: 2 },
  { name: "ahmed", isStudent: true, id: 3 },
  { name: "sara", isStudent: false, id: 4 },
];
//for of
// for(var user of users){
//   console.log(user.id)
// }

//filter

// var filteredArr =users.filter(function(x){
//   return x.isStudent == true&&x.name=='aya'&&x.id==1
// })
// console.log(filteredArr)

//findindex

// var foundedIndex = users.findIndex(function(user){
//   return user.id==5
// })
// console.log(foundedIndex)

//ternay operator

// var x = 5
// if(x>10){
//   console.log('x>10')
// }
// else{
//   console.log('x<10');
// }

//conditin?true:false

// x>10?console.log('x>10'):console.log('x<10');

///////////////////start workshop/////////////////////

//-------------select elements---------------//

var addBtn = document.getElementById("addBtn");

var taskInput = document.getElementById("taskInput");

var mySelect = document.getElementById("mySelect");

var searchInput = document.getElementById('searchInput')

addBtn.onclick = addTodo;
var todos = [];

if (localStorage.getItem("allTodos") != null) {
  todos = JSON.parse(localStorage.getItem("allTodos"));
  displayData(todos);
}
function addTodo() {
  var task = {
    taskDetails: taskInput.value,
    isCompleted: false,
    id: `${Math.random() * 10000}-${Math.random() * 10000}`,
  };
  todos.push(task);
  clear()
  localStorage.setItem("allTodos", JSON.stringify(todos));
  console.log(todos);
  displayData(todos);
}

function displayData(arr) {
  var cartoona = "";
  for (var task of arr) {
    cartoona += `<div class="tasks my-3 rounded text-light d-flex justify-content-between px-3 py-2 align-items-center ${task.isCompleted == true?"bg-task":""}">
 <div class="task d-flex">
     <i class="fa-regular fa-circle-check" onclick="beCompleted('${task.id}')"></i>
     <p class="task-text m-0 p-0 align-self-center ${task.isCompleted == true?"completed":""} ">${task.taskDetails}</p>
 </div>
 <div>
     <i class="fa-solid fa-trash mx-2" onclick="deleteTodo('${task.id}')"></i>
 </div> 
 </div>`;
  }
  document.getElementById("tasks").innerHTML = cartoona;
}

function beCompleted(id) {
  console.log(id);
  var foundedIndex = todos.findIndex(function (task) {
    return task.id == id;
  });
  todos[foundedIndex].isCompleted = todos[foundedIndex].isCompleted ==true?false:true;
  localStorage.setItem("allTodos",JSON.stringify(todos))
  displayAccordingSelectValue()
}

// console.log(mySelect)
// console.log(mySelect.options[1].value);

mySelect.onchange = function(){
 displayAccordingSelectValue() 
}

function displayAccordingSelectValue(){
  var selectedValue = mySelect.options[mySelect.options.selectedIndex].value;
  switch(selectedValue){
    case "all":
      displayData(todos);
      break;
      case "completed":
        var completedTask =todos.filter(function(task){
          return task.isCompleted == true
        })
        displayData(completedTask);
        break;
        case "uncompleted":
          var unCompletedTask =todos.filter(function(task){
            return task.isCompleted == false
          })
          displayData(unCompletedTask);
          break;
  }
}
function deleteTodo(id){
  var foundedIndex = todos.findIndex(function(task){
    return task.id==id
  })
  todos.splice(foundedIndex,1)
  displayData(todos)
  localStorage.setItem("allTodos",JSON.stringify(todos))
}

searchInput.oninput = function(e){
  console.log(e.target.value)
  var searchArr = [];
  for(var i=0;i<todos.length;i++){
    if(todos[i].taskDetails.includes(e.target.value)){
      searchArr.push(todos[i])
    }
  }
  displayData(searchArr)
}


// var arr =[
//   {task:"hello"}, true
//   {task:"hello2"}, true
//   {task:"run"},false
// ]

// //l

function clear(){
  taskInput.value=''
}


