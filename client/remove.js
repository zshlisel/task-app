function deleteTask(btnDeleteElement){
    let id = btnDeleteElement.parentNode.parentNode.getAttribute('data-task-id');
    let index = parseInt(id);

    let confirmToDelete = confirm("Are you sure you want to delete?")
    if (confirmToDelete == true) {
      tasks.splice (index,1)
      displayTasks()
    }
}        

//     tasks.splice(idn,1);
//     displayTasks();
//   }