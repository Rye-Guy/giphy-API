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
    }
}


$("#createButton").on("click", function(){
    event.preventDefault();

    var newSearch = $("#textInput").val().trim();

    searches.push(newSearch);

    makeButtons();
});


$("button").on("click", function(){
    $("#gifArea").empty();
    gifSearch = $(this).attr("data-search");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=k7ghyogO0TCLwIKB6SUSY71p7om684u5&limit="+limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

      //  console.log(response);

        var result = response.data;

       // console.log(result);

        for(var i = 0; i < result.length; i++){

            var item = $("<div class='item'>");

            var rating = result[i].rating;

            var newP = $("<p>").text("Picture Rating: " + rating);

            var gifImg = $("<img>");

            gifImg.attr("src", result[i].images.original.url);

            item.append(newP);
            item.append(gifImg);

            $('#gifArea').prepend(item);
            
        }

    });
});

