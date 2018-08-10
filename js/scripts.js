// api key k7ghyogO0TCLwIKB6SUSY71p7om684u5
var limit = 10; 
var searches = ["Baseball", "Hockey", "Pinball", "Fire", "Rainbow", "Waterfall"];


function makeButtons(){
    $("#buttonArea").empty();

    for(var i = 0; i < searches.length; i++){
        var btn = $("<button class='btn'>");
        btn.addClass('searchButton');
        btn.attr('data-search', searches[i]);
        btn.text(searches[i]);
        $('#buttonArea').prepend(btn);
   
        text = $("#textInput").val('');
        text; 
        console.log(text);
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
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+gifSearch+"&api_key=k7ghyogO0TCLwIKB6SUSY71p7om684u5&limit="+limit+"&rating=pg-13";

    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

       console.log(response);

        var result = response.data;

       // console.log(result);

        for(var i = 0; i < result.length; i++){

            var imgStill = result[i].images.fixed_height_still.url;
            var imgAnimate = result[i].images.fixed_height.url;


            var item = $("<div class='item'>");

            var rating = result[i].rating;
            console.log(rating);
          //  if(rating == 'r' || rating == 'pg-13'){
           //      item.remove();
           //      console.log("I'm saving your virigin eyes");
            
        //    }else{

            var newP = $("<p>").text("Picture Rating: " + rating);

            var gifImg = '<img src="' + imgStill + '" data-still="' + imgStill + '" data-animate="' + imgAnimate + '" data-state="still" class="imagesControl">';

            //gifImg.attr("src", "still")
            //gifImg.attr("src", imgStill);
            //gifImg.attr("src", imgAnimate);

            item.append(newP);
            item.append(gifImg);

            $('#gifArea').prepend(item);
           // }

        }
       // $(document).on("click", ".imagesControl", pausePlayGifs);

    });
}
    $("#gifArea").on("click", ".imagesControl", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            var animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            } else {
            var still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            }
    });


    $(document).on("click", ".searchButton", displayGifs);
//displayGifs();
makeButtons();

    $("#numberOfGifs").text(limit);
    $("#up").on("click", function(){

        limit++;
        $("#numberOfGifs").text(limit);    
    });
    $("#down").on("click", function(){

        limit--;
        $("#numberOfGifs").text(limit);    
    });


