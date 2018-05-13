// api key k7ghyogO0TCLwIKB6SUSY71p7om684u5
var limit = 10; 
console.log('Hello!');
var gifSearch = $("#textInput").val();


$("button").on("click", function(){
    $("#gifArea").empty();
   //gifSearch = $(this).attr("data-search");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=k7ghyogO0TCLwIKB6SUSY71p7om684u5&limit="+limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        console.log(response);

        var result = response.data;

        console.log(result);

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

