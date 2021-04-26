var markComplete = function (id){
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id + '/mark_complete?api_key=53',
        dataType: 'json',
        success: function (response, textStatus) {
            //displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });  
}

var markActive = function (id) {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=53',
        dataType: 'json',
        success: function (response, textStatus) {
        //displayAllTasks();
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

var createTaskAjax = function (){
    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=53',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#todo-input').val()
          }
        }),
        success: function (response, textStatus) {
          displayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
}

var displayAllTasks = function () {
    $.ajax({
      type: 'GET',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=53',
      dataType: 'json',
      success: function (response, textStatus) {
        getDateNow();
        $('tbody').empty();
        response.tasks.forEach(function (task) {
        var taskName = task.content;
        var id = task.id;
        
        $('tbody').append('<tr class = "task-row activeTask">' +
        '<td> <input type="checkbox" class = "check" data-id = "'+ id + '"' + (task.completed ? 'checked' : '') + 
        '>'+
        '<td class="task">' + taskName + '</td>' +
        '<td><button class="btn btn-light btn-sm remove" data-id = "'+ id + '"> remove</button></td>' +
    '</tr>');
        })
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
  }

  var getDateNow = function() {
    var date = new Date();
    document.getElementById("dateNow").innerHTML = ("Date: " + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate());
  }

$(document).ready(function () {

    displayAllTasks(); 
    $(document).on('click', '.btn.remove', function (event) {
        var idTask = $(this).data('id');
        $.ajax({
            type: 'DELETE',
             url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + idTask +'?api_key=53',
             success: function (response, textStatus) {
               console.log(response);
             },
             error: function (request, textStatus, errorMessage) {
               console.log(errorMessage);
             }
           });
        $(this).closest('tr').remove();
    });

    $('#add-task').on('submit', function (event) {
        event.preventDefault();
        createTaskAjax();
        $('#todo-input').val('');        
    });

    $(document).on('change', '.check', function(event) {
      var idTask = $(this).data('id');
      console.log(this);
      if(this.checked) {
          markComplete(idTask);     
          console.log((this).closest('tr'));
          $(this).closest('tr').removeClass('activeTask');
          $(this).closest('tr').addClass('completeTask');   
      } else {
          markActive(idTask);
          console.log((this).closest('tr'));
          $(this).closest('tr').show();
          $(this).closest('tr').addClass('activeTask');
          $(this).closest('tr').removeClass('completeTask');
      }    
  });

    $(document).on('click', '#all-filter', function(event){
      console.log("clicked all");
      $('label').removeClass('active');
      $(this).closest('label').addClass('active');
      $('tr').show();
    })

    $(document).on('click', '#active', function(event){
      $('label').removeClass('active');
      $(this).closest('label').addClass('active');
      $('.task-row.completeTask').hide();
      $('.task-row.activeTask').show();
      event.preventDefault();
    })

    $(document).on('click', '#complete', function(event){

      $('label').removeClass('active');
      $(this).closest('label').addClass('active');
      //$('.activeTask').hide(100);
      $('.task-row.activeTask').hide();
      $('.task-row.completeTask').show();
      event.preventDefault();
      
      
    })


});

