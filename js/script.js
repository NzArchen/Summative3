$(function() {

  let itemHTML = $('#item-template').text();
  let itemTemplate = Template7(itemHTML).compile();

  // jquery coding inside this function
  let key = 'VMNZH093QVRWvJhDd5cMBVFv30qgV2Bi'; //form my behance account api

	let urlProjects = 'https://api.behance.net/v2/users/Carlaveggio/projects?client_id='+key;
	console.log(urlProjects);

  $.ajax({
    url:urlProjects,
    dataType:'jsonp',
    success:function(res){
      let projects = res.projects;
      for(var i=0; i<projects.length;i++){
        let project = projects[i];
        project.class = 'grid__sizer';
        if((i%4) == 0){
          project.class = 'grid__item--high';
        }

        let output = itemTemplate(project);
        $(output).appendTo('.grid.mx-auto');
        console.log(project);
      }

       // Masonry grid setup
      $(".grid").masonry({
        itemSelector: ".grid__item",
        columnWidth: ".grid__sizer",
        // gutter: 10,
        gutter: 23,
        // percentPosition: true,
        fitWidth: true,
      });
    }
  });


 

  

  // Image replacement handler
  // $(document).on("click", ".grid__item", function(e) {
  //   e.preventDefault();

  //   var imageSrc = $(this).css("background-image").replace(/url\(|"|\)/g,'');
  //   $(".js-modal-image").attr("src", imageSrc);
  // });

  //project modal popup

  let projectDetailsHTML = $('#project-details-template').text();
  let projectDetailsTemplate = Template7(projectDetailsHTML).compile();

  $('#modalPicture').on('show.bs.modal',function(e){


    let target = e.relatedTarget; 
    let projectid = $(target).data('projectid');

    let urlProject = 'http://www.behance.net/v2/projects/'+projectid+'?api_key='+key;
    console.log(urlProject);

    $.ajax({
      url:urlProject,
      dataType:'jsonp',
      success:function(res){
        let project = res.project;
        let output = projectDetailsTemplate(project);
        $('.modal-content').empty();
        $('.modal-content').append(output);
        console.log(project);
      }
    });



  });



});




