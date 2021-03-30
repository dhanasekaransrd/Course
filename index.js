
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("button").style.marginLeft = "200px";
    document.getElementById("search-bar").style.marginLeft = "200px";
    document.getElementById("tabledata").style.marginLeft = "200px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("button").style.marginLeft= "0";
    document.getElementById("search-bar").style.marginLeft= "0";
    document.getElementById("tabledata").style.marginLeft= "0";
  }
  function createCourse() {
    closeNav()
    document.getElementById("button").addEventListener('click',function(){
      document.querySelector(".popup").style.display = "flex";
    })
}

  function cancelCourse() {
    document.getElementById("closebtn").addEventListener('click',function(){
      document.querySelector(".popup").style.display = "none";
    })

  }
 
  function submit_form() {

    // if($('#course_name').val().length>0) 
    //           {
    //                 if($('#course_name').val().trim()=='') 
    //                 {
    //                 document.getElementById("hide").style.visibility = "visible";
                    
    //                       $('#course_name').val('');
    //                       $('#course_name').focus();
    //                       return;
    //                 }
    //           }
    //           else 
    //           {
    //             document.getElementById("hide").style.display="visible";
              
    //                 $('#course_name').val('');
    //                 $('#course_name').focus();
    //                 return;
    //           }

    var course_name = document.getElementById('course_name').value;
    var modules = document.getElementById('modules').value;
    var category  = document.getElementById('category').value;
    var sub_category  = document.getElementById('sub_category').value;
    var status = document.getElementById('status').value;

    
$.post("/submit_course_details",{
    course_name:course_name,
    modules: modules,
    category: category,
    sub_category: sub_category,
    status: status
    
},
function(data) {
  console.log(data)
alert("Data inserted")

window.location="/";
})
}
function viewCourse() {
alert('view_c')
  $.post("/viewing_details",{

  },
  function(data) {
    //console.log(data)
      if(data.length > 0)
      {
        document.getElementById("tabledata").style.display="block";
        var view_data='';
        for(i = 0;i<data.length;i++)
        {
          view_data=view_data+'<tr><td>'+data[i].COURSES+'</td><td>'+data[i].MODULES+'</td><td>'+data[i].CATEGORY+'</td><td>'+data[i].SUBCATEGORY+'</td><td>'+data[i].STATUS+'</td><td><a onclick="updating_candidate_data(\''+ data[i].id+'\')"><i class="fa fa-pencil"></i></a></td><td><a onclick="deleting_candidate_data(\''+ data[i].id+'\')" ><i class="fa fa-trash"></i></a> </td><td></tr>'
        }
        document.getElementById("table_data").innerHTML=view_data;
       }
       else
       {
         document.getElementById("tabledata").style.display="none";
       }
  })
}

function search_course(){
  var course=document.getElementById("search-input").value;
  $.post('/search_data',{
    course:course
  },
  function(data){
    console.log(data)
    if(data.length > 0)
    {
      document.getElementById("tabledata").style.display="block";
      var find_data='';
      for(i = 0;i<data.length;i++)
      {
        find_data=find_data+'<tr><td>'+data[i].COURSES+'</td><td>'+data[i].MODULES+'</td><td>'+data[i].CATEGORY+'</td><td>'+data[i].SUBCATEGORY+'</td><td>'+data[i].STATUS+'</td><td><button onclick="updating_candidate_data(\''+ data[i].id+'\')" class="btn btn-success btn-sm" value="update">update</button> </td><td><button onclick="deleting_candidate_data(\''+ data[i].id+'\')" class="btn btn-danger btn-sm" id="delete_button" value="delete">delete</button> </td><td></tr>'
      }
      document.getElementById("table_data").innerHTML=find_data;
     }
     else
     {
       document.getElementById("tabledata").innerHTML="<h2>No Courses Found</h2>";
       document.getElementById("table_data").style.display="none";
       
     }
  })
}


function deleting_candidate_data(id) {
  sessionStorage.setItem("delete_id",id);
  var modal=document.getElementById("popup_delete");
  modal.style.display = "flex";
}

var modal=document.getElementById("popup_delete");
var btn=document.getElementById("close_delete");
btn.onclick = function() {
  modal.style.display = "none";
}
//   
function deleteCourse(id) {

  $.post("/deleting_details",{
    id:id

  },
  function(data){
    
    // sessionStorage.deleteItem("delete_id");
    alert("deleted successfully.....")
    window.location="/";
  })
}

function updating_candidate_data(id){
  
  console.log(id)
  var id = id;
  $.post('/updating_details',{
    id:id
  },
  function(data){
    closeNav()
    var update1=document.getElementById("update_popup");
    update1.style.display = "flex";
    sessionStorage.setItem("update_id",id);
    document.getElementById("course_name1").value=data[0].COURSES;
    document.getElementById("modules1").value=data[0].MODULES;
    document.getElementById("category1").value=data[0].CATEGORY;
    document.getElementById("sub_category1").value=data[0].SUBCATEGORY;
    document.getElementById("status1").value=data[0].STATUS;
  } )
}

var update=document.getElementById("update_popup");
var btn1=document.getElementById("cancel_update");
btn1.onclick = function() {
  update.style.display = "none";
}


function submit_update(id){
  console.log(id)
  var id = id;
  var course = document.getElementById("course_name1").value;
  var module = document.getElementById("modules1").value;
  var category = document.getElementById("category1").value;
  var subcategory = document.getElementById("sub_category1").value;
  var status = document.getElementById("status1").value;
  $.post('/updating_course_data',{
      id:id,    
      course:course,
      module:module,
      category:category,
      subcategory:subcategory,
      status:status

  },
  function(data)
  {
   alert("updated successfully");
   window.location="/";
  })
}


