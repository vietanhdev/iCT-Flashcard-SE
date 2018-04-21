 // Load flashcard
 $(document).ready(function(){

  $.getJSON( "pinned-flashcard.json", function(data) {
console.log(data);
let card = data;

      for (i = 0; i < card.length; i++) {
  
         $("#Flashcard-Carousel").append(`
   <div class="item">
          <!-- Card Flip -->
          <div id="fc-`+i+`" class="flashcard">
              <div class="flip">
                <div class="front">
                  <!-- front content -->
                  <div class="card">
                    <img class="card-img-top" src="assets/flashcard-images/`+card[i].image+`" alt="Card image">
                    <div class="card-body">
                      <h4 class="card-title">`+card[i].title+` `+card[i].ipapron+`</h4>
                        <button class="btn btn-light" onclick='responsiveVoice.speak("`+card[i].title+`", "UK English Female");' >🔊 UK</button>
                        <button class="btn btn-light" onclick='responsiveVoice.speak("`+card[i].title+`", "US English Female");' >🔊 US</button>
                      </div>
                    <div flashcard="#fc-`+i+`" class="card-footer text-muted flip-card-btn">
                        <i class="fa fa-mail-forward"></i>
                        Mặt sau
                    </div>
                  </div>
                </div>
                <div class="back">
                  <!-- back content -->
                  <div class="card">
                    <div class="card-body">
                      <div class="card-block">
                        <h4 class="card-title">`+card[i].title+` `+card[i].ipapron+`</h4>
                      </div>
                      <div class="card-block">
                        <p class="card-text">`+card[i].content+`</p>
                        <a href="#" class="card-link">
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                          Chỉnh sửa card</a>
                      </div>
                    </div>
                    <div flashcard="#fc-`+i+`" class="card-footer text-muted flip-card-btn">
                        <i class="fa fa-mail-forward"></i>
                        Mặt trước
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Card Flip -->
        </div>
   `);

    }

// Init flashcard slider
$('#Flashcard-Carousel').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
      0:{
        items:1,
        nav:true
      },
      400:{
        items:2,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
    }
  });


// Add flip button event
$(".flip-card-btn").click(function(){
    $($(this).attr("flashcard")).toggleClass("hover");
  });
  });

 
  
});