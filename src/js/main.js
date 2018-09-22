var mediaCount = 0; // for media title purposes
var comboSelection = "Pictures"; // default selection for combo box (Pictures/Videos)

// Fires when Puppers button is clicked, calls FetchFromAPI
$("#btnWoof").click(function(){
    FetchFromAPI(false);
}); 

// Call to WebAPI to get the image url
function FetchFromAPI() {
    $.get( "https://random.dog/woof.json", function( data ) {
    DisplayMedia(data.url); 
    }); 
}

// Determines the media format, then adds to page based on what's selected in the media combobox.
function DisplayMedia(url) {
    //console.log(url);
    var format = url.substr(url.length - 3);
    if (comboSelection == 'Pictures')
        if (format == 'jpg' || format == 'JPG' || format == 'png') {
            mediaCount++; // for Assessibility purposes (picture title)
            $('#pupperGallery').prepend('<div class="col-lg-3 col-md-4 col-xs-6"><a href="' + url + '" data-toggle="lightbox" class="d-block mb-4 h-100" title="Puppy Picture ' + mediaCount + '">  <img class="img-thumbnail" id="puppyImage" src="' + url + '" alt="Puppy Picture' + mediaCount + '"></a></div>');
        } else {
            FetchFromAPI(); 
        }
    else if (comboSelection == 'Videos') {
        if (format == 'mp4' || format == 'MP4') {
            mediaCount++; // for Assessibility purposes (video title)
            $('#pupperGallery').prepend('<div class="col-lg-3 col-md-4 col-xs-6"><video  controls title="Video ' + mediaCount + '"><source src="'+ url + '" type="video/mp4"><source src="'+ url + '" type="video/ogg">Your browser does not support the video tag.</video></div>'); 
        } else {
            FetchFromAPI(); 
        }
    }
}

// lightbox add-in, for full screen images when images are clicked..
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

// a selector for Pictures or Videos, changes the combobox text, clear the gallery and resets the counter.
$(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    $('#pupperGallery').html('');
    comboSelection = $(this).parents(".dropdown").find('.btn').val();
    mediaCount = 0;
});

