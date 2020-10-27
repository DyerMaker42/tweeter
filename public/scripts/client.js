/*
* Client-side JS logic goes here
* jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
  const loadTweets = function () {
    $.ajax("/tweets", {
      method: 'GET',
    })
      .then(function (res) {

        $("#tweet-container").empty();
        //receives array of tweets as json
        renderTweets(res);
      })
      .catch(function (err) {

      })
  };

  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {

      let newTweet = createTweetElement(tweet);

      $("#tweet-container").prepend(newTweet);
    }

    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  const createTweetElement = function (tweet) {
    //gets how long ago tweet was created
    let daysAgo = moment(tweet["created_at"]).startOf('day').fromNow();


    //function to convert potentially malicious script to text
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
    //variable storing cleaned user tweet
    const cleanTweet = escape(tweet.content.text);
    //creates tweet element
    let $tweet =
      $(`<article>
    <header class="tweet">
      <div class="tweet-header">
        <i class="fas fa-horse-head"></i>
        <h4>${tweet.user.name}</h4>
      </div>
      <h2>${tweet.user.handle}</h2>
    </header>
    <p class="tweet-body"> ${cleanTweet}</p>
    <footer class="tweet-footer">
      <p>${daysAgo}</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-share"></i>
        <i class="fas fa-heartbeat"></i>
      </div>
    </footer>
  </article>`);

    return $tweet;
  }

  const isTweetValid = () => {

    if ($("#tweet-text").val().length > 140) {

      $("div.error-box").text("Over 140 characters, please reduce then resubmit").slideDown(1000);
      setTimeout(function () {
        $("div.error-box").slideUp(2000)
      }, 6000);
      return false;
    }
    if ($("#tweet-text").val().length === 0) {

      $("div.error-box").text("Oops, you submitted nothing, please add something then try again").slideDown(1000)
      setTimeout(function () {
        $("div.error-box").slideUp(2000)
      }, 6000);
      return false;
    }
    return true;
  }

  //send tweet
  $("section.new-tweet form").on('submit', function (event) {
    event.preventDefault();
    //doing the error thing

    if (isTweetValid()) {
      //lookup why event target superior to this keyword
      let serial = $(event.target).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: serial,
      })
        .then(function (res) {
          //new tweets loaded
          loadTweets();

          //clears text box and resets counter
          $("#tweet-text").val("");
          $(".counter").val(140);

        })
        .catch(function (err) {

        })
    }
  });

  loadTweets();

});

