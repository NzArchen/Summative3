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
        // console.log(project);
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

  let projectDetailsHTML = $('#project-details-template').text();
  let projectDetailsTemplate = Template7(projectDetailsHTML).compile();

  $('#modalPicture').on('show.bs.modal',function(e){


    let target = e.relatedTarget; 
    let projectid = $(target).data('projectid');

    let urlProject = 'http://www.behance.net/v2/projects/'+projectid+'?api_key='+key;
    // console.log(urlProject);

    $.ajax({
      url:urlProject,
      dataType:'jsonp',
      success:function(res){
        let project = res.project;
        let output = projectDetailsTemplate(project);
        $('.modal-content').empty();
        $('.modal-content').append(output);
        // console.log(project);
      }
    });



  });

  // contact from

  $('#characterLeft').text('140 characters left');
    $('#message').keydown(function () {
        var max = 140;
        var len = $(this).val().length;
        if (len >= max) {
            $('#characterLeft').text('You have reached the limit');
            $('#characterLeft').addClass('red');
            $('#btnSubmit').addClass('disabled');            
        } 
        else {
            var ch = max - len;
            $('#characterLeft').text(ch + ' characters left');
            $('#btnSubmit').removeClass('disabled');
            $('#characterLeft').removeClass('red');            
        }
    }); 


    //map

    let center = [51.539076, -0.100367] //center of map

    let map = L.map('map').setView(center,15);// set view for map 

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJjaGVuIiwiYSI6ImNqNmxncXh3YzFnYzUzOGxtbDlvb2FqYjkifQ.kYzWwDvJWNa7ZPfH0VBx2g').addTo(map);

    let studio= [                  // mark on the map
          {
            latlng:[51.539076, -0.100367], 
            description:'<h3>Carl Warner Studio<h3><div class="studio"></div>',
            iconImage:'css/images/flag.svg'
          }
          ];

    // _(studio).each(function(studio){  // icon for mark
    studio.forEach(function(studio){  // icon for mark

    let studioIcon = L.icon({
                  iconUrl:studio.iconImage, // link to icon file
                  iconSize:[30,30]
                });

    let marker = L.marker(studio.latlng,{icon:studioIcon}).addTo(map); // put the icon to map

    marker.bindPopup('<div class="supermarket">'+studio.description+'</div>') //  popup for description when click

  });

});

// pie chart








