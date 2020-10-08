/*
* Client-side JS logic goes here
* jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {
  const loadTweets = function () {
    // will use jquery to make request to /tweets
    //receives array of tweets as json
    // AJAX Get request to /tweets

    $.ajax("/tweets", {
      method: 'GET',
    })
      .then(function (res) {
        console.log("ajax successfully received tweets")
        console.log('res', res);
        $(".tweets").empty();
        renderTweets(res);
      })
      .catch(function (err) {
        console.log("error ajax did not successfully retrieve tweets")
      })
  };
  loadTweets();

  const renderTweets = function (tweets) {
    // loops through tweets
    // if (tweets.length === 1) {
    //   let newTweet = createTweetElement(tweet);

    //   $("#tweet-container").append(newTweet)
    // }


    for (let tweet of tweets) {

      let newTweet = createTweetElement(tweet);

      $("#tweet-container").prepend(newTweet)
    }

    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }



  //fix date later

  const createTweetElement = function (tweet) {
    let daysAgo = function (tweet) {
      return moment(tweet["created_at"]).startOf('day').fromNow();

    }
    let $tweet = /* Your code for creating the tweet element */
      $(`<article>
    <header class="tweet">
      <div class="tweet-header">
        <i class="fas fa-horse-head"></i>
        <h4>${tweet.user.name}</h4>
      </div>
      <h2>${tweet.user.handle}</h2>
    </header>
    <p class="tweet-body"> ${tweet.content.text}</p>
    <footer class="tweet-footer">
      <p>${daysAgo(tweet)}</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-share"></i>
        <i class="fas fa-heartbeat"></i>
      </div>
    </footer>
  </article>`)

    return $tweet;
  }

  // $(document).ready(functino) === $(function)


  // $(document).ready(function () {
  //   const tweetData = [{
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   }, {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   }];

  //const $tweet = $(`<article class="tweet">Hello world</article>`);


  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // console.log($('#tweet-container'));
  // $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  //renderTweets(data)
  //renderTweets(tweetData)

  // responsible for fetching tweets from /tweets page
  /* const loadTweets = function () {
      // will use jquery to make request to /tweets
      //receives array of tweets as json
      // AJAX Get request to /tweets
  
      $.ajax("/tweets", {
        method: 'GET',
      })
        .then(function (res) {
          console.log("ajax successfully received tweets")
          console.log('res', res);
          renderTweets(res);
        })
        .catch(function (err) {
          console.log("error ajax did not successfully retrieve tweets")
        })
    };
  */
  //renderTweets(loadTweets);
  //   /loadTweets();
  // });



  //ajax handler
  //old garbage code
  // $(function () {
  //   $("div.under-tweetgarbage button").on('click', function () {
  //     console.log('Tweetclicked, performing ajax call...');
  //     $.ajax('index.js', { method: 'POST' })
  //       .then(function (sendsFormData) {
  //         let serializeForm = sendsFormData.serialize();
  //         $.preventDefault();
  //         console.log('Success: ', morePostsHtml);
  //         renderTweets(serializeForm);
  //       });
  //   });
  // })

  // load tweets function

  const isTweetValid = () => {

    if ($("#tweet-text").val().length > 140) {
      alert("Over 140 characters, please reduce then resubmit");

      return false;
    }
    if ($("#tweet-text").val().length === 0) {
      alert("Oops, you submitted nothing, please add something then try again");
      return false;
    }
    return true;
  }


  $("section.new-tweet form").on('submit', function (event) {
    event.preventDefault();

    console.log('on submit')
    if (isTweetValid()) {
      //lookup why event target superior to this keyword
      let serial = $(event.target).serialize();
      $.ajax("/tweets", {
        method: "POST",
        data: serial,
      })
        .then(function (res) {

          console.log("tweet sent to server ")
        })
        .catch(function (err) {
          console.log("ajax load tweeter error")
        })
        .then(function () {
          loadTweets();
          console.log("new tweets loaded")
        })
    }
  });

});

// get the data sent

//promise

//.catch for error


//network dev toodls

// another round playing with ajax