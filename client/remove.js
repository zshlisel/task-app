async function deleteTask(btnDeleteElement) {
  const userId = sessionStorage.getItem('userId')
  let id = btnDeleteElement.parentNode.parentNode.getAttribute('data-task-id');
  let confirmToDelete = confirm("Are you sure you want to delete?")
  if (confirmToDelete == true) {
    let response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
      headers:{
        'authorization': userId
      }
    });

    if (response.ok) {
      const index = tasks.findIndex((task) => task.id == id);
      if (index !== -1) {
        tasks.splice(index, 1);
        displayTasks();
      }
    } else {
      console.error('Failed to delete task');
    }
  }
}
