let key = 'VMNZH093QVRWvJhDd5cMBVFv30qgV2Bi'; //form my behance account api

$(function() {

  let itemHTML = $('#item-template').text();
  let itemTemplate = Template7(itemHTML).compile();

  // jquery coding inside this function

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

var width = 250;
var height = 250;
var marginTop = 30;
var marginLeft = 30;

// var data = [
//       {
//         city:'Dunedin',
//         size: 20
//       },
//       {
//         city:'Christchurch',
//         size: 40
//       },
//       {
//         city:'Wellington',
//         size: 60
//       },
//       {
//         city:'Auckland',
//         size: 80
//       }
//     ];

var data = [];
var call1 = $.ajax({
  url: 'https://api.behance.net/v2/users/Carlaveggio?client_id='+key,
  dataType: 'jsonp'
});
var call2 = $.ajax({
  url: 'https://api.behance.net/v2/users/tinapicardphoto?client_id='+key,
  dataType: 'jsonp'
});
var call3 = $.ajax({
  url: 'https://api.behance.net/v2/users/ilonaveresk?client_id='+key,
  dataType: 'jsonp'
});
var call4 = $.ajax({
  url: 'https://api.behance.net/v2/users/andrejosselin?client_id='+key,
  dataType: 'jsonp'
});

$.when(call1, call2, call3, call4).done(function(res1,res2,res3,res4){
  // add user names to data
  res1[0].user.stats.userName = res1[0].user.display_name;
  res2[0].user.stats.userName = res2[0].user.display_name;
  res3[0].user.stats.userName = res3[0].user.display_name;
  res4[0].user.stats.userName = res4[0].user.display_name;

  // add stats to array
  data.push(res1[0].user.stats);
  data.push(res2[0].user.stats);
  data.push(res3[0].user.stats);
  data.push(res4[0].user.stats);

  console.log(data);

  makePieChart('views');
  makePieChart('appreciations');
  makePieChart('followers');
});

function makePieChart(chartType) {
  var radius = Math.min(width,height)/2;

  var colGen = d3.scaleOrdinal()
          .range(['#F6790F','#999B58','#EDBA81','#F6B930',]);

  var pieDataGen = d3.pie()
            .sort(null)
            .value(function(d){ return d[chartType] });


  var pieData = pieDataGen(data);


  var arcGen = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius/1.8)
          .cornerRadius(0);

  var arcLabelGen = d3.arc()
          .outerRadius(radius)
          .innerRadius(radius/2);


  var chart = d3.select('.' + chartType)
          .append('g')
          .attr('transform','translate('+marginLeft+','+marginTop+')');

  var pie = chart.append('g')
          .attr('transform','translate('+radius+','+radius+')');

  pie.selectAll('.arc')
    .data(pieData)
    .enter()
    .append('path')
    .attr('id',function(d,i){ return 'arc'+i})
    .attr('class','arc')
    .attr('d',arcGen)
    .attr('fill',function(d){ return colGen(d.data.userName) })

  pie.selectAll('.size')
    .data(pieData)
    .enter()
    .append('text')
    .style('text-anchor','middle')
    .style('alignment-baseline','middle')
    .style('font-family','Verdana')
    .style('font-size','12')
    .attr('transform',function(d){ return 'translate('+arcLabelGen.centroid(d)+')'})
    .text(function(d){ return d.data[chartType] });

  // pie.selectAll('.user')
  //   .data(pieData)
  //   .enter() 
  //   .append('text')
  //   .style('font-size','10')
  //   .attr('dy', -5)
  //   .attr('dx', 40)
  //   .append('textPath')
  //   .attr('xlink:href',function(d,i){ return '#arc'+i})
  //   .text(function(d){ return d.data.userName})

  // titles
  pie.append('text')
    .text(function() {
      if (chartType === 'appreciations') {
        return '\uf164'
      } else if (chartType === 'followers') {
        return '\uf234'
      } else if (chartType === 'views') {
        return '\uf06e'
      }
    })
    .attr('transform','translate(0,0)')
    .attr('text-anchor','middle')
    .attr('alignment-baseline','middle')
    .attr('class','fa fa-3x')
    .style('fill', '#5E5B60')
}

