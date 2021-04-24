var markComplete = function (id){
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id + '/mark_complete?api_key=53',
        dataType: 'json',
        success: function (response, textStatus) {
            displayAllTasks();
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
        displayAllTasks();
        console.log(this);
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
        $('tbody').empty();
        response.tasks.forEach(function (task) {
        var taskName = task.content;
        var id = task.id;
        
        $('tbody').append('<tr class = "task-row">' +
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
        console.log(event);
        console.log(this);
        createTaskAjax();
        $('#todo-input').val('');
        //if there is a checkbox, then change the class
        /*if($(input[checked])){
          $('tr').addClass('complete');
          $('tr').removeClass('active');
        }else{
          $('tr').removeClass('complete');
          $('tr').addClass('active');
        }*/
        
    });

    $(document).on('change', '.check', function(event) {
      var idTask = $(this).data('id');
      console.log(this);
      if(this.checked) {
          markComplete(idTask);
          
          console.log((this).closest('tr'));
          $(this).closest('tr').addClass('complete');
          event.preventDefault();
          
          
      } else {
          markActive(idTask);
          $(this).closest('tr').show();
          $(this).closest('tr').addClass('active');
          event.preventDefault();
      }    
  });

    $(document).on('change', '.all-filter', function(event){
      $('tr').toggle();
    })

    $(document).on('change', '.active-filter', function(event){
      
     /* if($("input[type = 'checkbox']").getAttribute( "checked")){
        console.log("it's checked")
        //$(this).closest('tr').hide();
      } else {
        $(this).closest('tr').show();
      } */
      
      $('tr .complete').hide();
      $('tr .active').show();
    })

    /*$(document).on('change', '.complete-filter', function(event){
      $(input['checked']).show();
      !($(input['checked'])).hide();
  */
    
});

