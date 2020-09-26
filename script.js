$(document).ready(function() {

// Start your code from here
    let temas = ['barcelona','havertz','messi','champions','balon','portero', 'nutmeg'];
    
    loadArray = function() {
        temas.forEach(football => {
            $("#football-buttons").append(`<input type="submit" class="footballClass" value="` + football + `"/>`);
         });
    };

    $("#football-form").submit(function( event ) {
        event.preventDefault();
        var tema = $("#football-input").val();
        $("#football-buttons").empty();
        temas.push(tema);
        loadArray();
    });

    //load initial array
    loadArray();
    
    $("#football-buttons").on("click", ".footballClass", function () {

        var inputVal = $(this).val();
        

        $.get('https://api.giphy.com/v1/gifs/search?api_key=ZCxO1IFFgwGkHQie3cOkkmoDuctVLiEa&q=' + inputVal + '&limit=10&offset=0&rating=g&lang=es', function(respuesta) {
            var gifList = $("#football");
            gifList.empty();

            for (var i = 0; i < respuesta.data.length; i++) {
                //var title = respuesta.data[i].title;
                var rating = respuesta.data[i].rating;
                var imaFixed = respuesta.data[i].images.fixed_height.url;
                var imaFixedStill = respuesta.data[i].images.fixed_height_still.url;

                var div = $("<div>");
                div.addClass("football-item");
                
                var image = $("<img>");
                image.attr("src", imaFixedStill); image.attr("gif-animado", imaFixed); 
                image.attr("gif-still", imaFixedStill); image.attr("isMoving", "no");
                image.addClass("currentGif");

                div.append(`<p>` + "Rating: " + `${rating}</p>`);
                div.append(image);

                gifList.append(div);
            }

        });
    }); 


    $("#football").on("click",".currentGif", function(){
  
        var enMovimiento = $(this).attr("isMoving");
          
          if (enMovimiento === "no") {
            
            $(this).attr("src", $(this).attr("gif-animado"));
            $(this).attr("isMoving", "si");
          }
          
          else {
                
            $(this).attr("src", $(this).attr("gif-still"));
            $(this).attr("isMoving", "no");
          }
    });

});