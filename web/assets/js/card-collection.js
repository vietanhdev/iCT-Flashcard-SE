$(document).ready(function(){

    // Chane focus to another card
    $(".flashcard-wrapper").click(function(){
         
        // Remove focus on old card
        $(".flashcard-wrapper.active .toolbox").removeClass("active");
        $(".flashcard-wrapper.active").removeClass("active");

        // Change focus to clicked card
        $(this).addClass("active");
        $(".flashcard-wrapper.active .toolbox").addClass("active");
    });
});