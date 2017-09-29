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
  $(document).on("click", ".js-button", function() {
    var imageSrc = $(this).parents(".grid__item").find("img").attr("src");
    $(".js-download").attr("href", imageSrc);
    $(".js-modal-image").attr("src", imageSrc);
    $(document).on("click", ".js-heart", function() {
      $(this).toggleClass("active");
    });
  });

});

