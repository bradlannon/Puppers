$( document ).ready(function() {
    console.log( "Page Loaded!" );
});



$("#myWoof").click(function(){
    $.get( "https://random.dog/woof.json", function( data ) {
        console.log( data.url );
        $('#pupperPic').prepend(    
        '<div class="col-md-3">' +
        '<div class="card mb-3 shadow-sm">' +
        '  <img class="card-img-top inline-block" data-src=" alt="Thumbnail" src="' + data.url + '" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">' +
        '  </div> ' +
       ' </div> ')
      }); 
}); 