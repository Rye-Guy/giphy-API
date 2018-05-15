// api key k7ghyogO0TCLwIKB6SUSY71p7om684u5
var limit = 10; 
var searches = ["Baseball", "Hockey", "Pinball", "Fire", "Rainbow"];


function makeButtons(){
    $("#buttonArea").empty();

    for(var i = 0; i < searches.length; i++){
        var btn = $("<button>");
        btn.addClass('searchButton');
        btn.attr('data-search', searches[i]);
        btn.text(searches[i]);
        $('#buttonArea').prepend(btn);
        $("#textInput").val('');
    }
}


$("#createButton").on("click", function(){
    event.preventDefault();

    var newSearch = $("#textInput").val().trim();

    searches.push(newSearch);

    makeButtons();
});

function displayGifs(){
//$("button").on("click", function(){
    $("#gifArea").empty();
    gifSearch = $(this).attr("data-search");
    console.log(gifSearch);
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=k7ghyogO0TCLwIKB6SUSY71p7om684u5&limit="+limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

       console.log(response);

        var result = response.data;

       // console.log(result);

        for(var i = 0; i < result.length; i++){

            var defaultSrc =  result[i].images.fixed_height.url;
            var stillSrc = result[i].images.fixed_height_still.url;


            var item = $("<div class='item'>");

            var rating = result[i].rating;

            var newP = $("<p>").text("Picture Rating: " + rating);

            var gifImg = $("<img class='imagesControl'>");

            gifImg.attr("src", "still")
            gifImg.attr("src", stillSrc);
            gifImg.attr("src", defaultSrc);

            item.append(newP);
            item.append(gifImg);

            $('#gifArea').prepend(item);
            
        }
       
    });
}

function pausePlayGifs() {
    var state = $(this).attr("src");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "still");
    }
}


$(document).on("click", ".imagesControl", pausePlayGifs);


$(document).on("click", ".searchButton", displayGifs);
//displayGifs();
makeButtons();

