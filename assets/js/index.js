const tasks = [];
let id_task = 0;
let input_task = document.getElementById("input_task");
let table_tasks = document.getElementById("table_tasks");
let total_tasks = document.getElementById("total_tasks");
let number_completed_tasks = document.getElementById("number_completed_tasks");

function addTask() {
  if (!input_task.value) {
    alert("Debes ingresar la tarea");
  } else {
    let object_task = {
      id: id_task,
      description: input_task.value,
      completed: false,
    };
    input_task.value = "";
    tasks.push(object_task);
    id_task++;
    renderTasks();
  }
}

function renderTasks() {
  let text = `<tr>
            <th class="ps-0">ID</th>
            <th class="ps-3">Tarea</th>
            <th class="ps-2">Listo</th>
            <th class="ps-2">Falta</th>
            </tr>`;
  tasks.forEach(function (x) {
    text += `
    <tr id="row_${x.id}"><td class="ps-0">${x.id}</td>
    <td id="description_cell" class="ps-1 pe-3">${x.description}</td>
    <td><input id="checkbox_${x.id}" type="checkbox" class="casillas"></td>
    <td><input id="checkbox2_${x.id}" type="checkbox" class="casillas_2"></td>
    <td id="symbol_${x.id}" class="ps-1"><button onclick="deleteTask(${x.id})">❌</button></td>
    </tr>
    `;
  });
  table_tasks.innerHTML = text;
  text = "";
  if (!tasks) {
    total_tasks.innerHTML = "0";
  } else {
    total_tasks.innerHTML = tasks.length;
  }
  filterTasks();
}

function filterTasks() {
  const list_completed_tasks = tasks.filter((x) => x.completed == true);
  if (!list_completed_tasks) {
    number_completed_tasks.innerHTML = "0";
  } else {
    number_completed_tasks.innerHTML = list_completed_tasks.length;
  }
  colorCompleted();
}

function colorCompleted() {
  tasks.forEach(function (x) {
    let casilla = document.getElementById("checkbox_" + x.id);
    let casilla_2 = document.getElementById("checkbox2_" + x.id);
    if (casilla.checked == true) {
      document.getElementById("row_" + x.id).style.backgroundColor = "lime";
      x.completed = true;
    } else if (x.completed == true && casilla_2.checked == true) {
      document.getElementById("row_" + x.id).style.backgroundColor =
        "lightgray";
      x.completed = false;
    } else if (x.completed == true) {
      document.getElementById("row_" + x.id).style.backgroundColor = "lime";
      casilla.checked = true;
    } else if (casilla_2.checked == true) {
      document.getElementById("row_" + x.id).style.backgroundColor =
        "lightgray";
      x.completed = false;
    } else if (x.completed == false) {
      document.getElementById("row_" + x.id).style.backgroundColor =
        "lightgray";
      casilla.checked = false;
    } else {
      document.getElementById("row_" + x.id).style.backgroundColor =
        "lightgray";
    }
  });
  number_completed_tasks.innerHTML = tasks.filter(
    (x) => x.completed == true
  ).length;
}

function deleteTask(id) {
  const index = tasks.findIndex((x) => x.id == id);
  tasks.splice(index, 1);
  renderTasks();
  colorCompleted();
}
