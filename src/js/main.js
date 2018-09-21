$("#myWoof").click(function(){
    fetchImage();
}); 

function fetchImage() {
    $.get( "https://random.dog/woof.json", function( data ) {
        displayImage(data.url);
    }); 
}

function displayImage(imgurl) {
    var format = imgurl.substr(imgurl.length - 3)
    if (format == 'jpg' || format == 'JPG' || format == 'gif' || format == 'png') {
        $('#pupperGallery').prepend('<div class="col-lg-3 col-md-4 col-xs-6"><a href="' + imgurl + '" class="d-block mb-4 h-100">  <img class="img-thumbnail" id="imgGallery" src="' + imgurl + '" alt="Puppy Picture"></a></div>')
    } else {
        //console.log(format + " is an incompatible format"); // video files will not display as image
        fetchImage(); // fetch for next potential image
    }
}

