//const vampire = (text) => console.log(`Hello ${text}`);

$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    const input = $(this);
    console.log(input.val().length);
    const counterNumber = 140 - input.val().length
    //research another way to do this later
    $(".counter").text(counterNumber);
    if (counterNumber <= 0) {
      $(".counter").css("color", '#f76e6e')
    }
  })
});
