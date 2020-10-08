/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const renderTweets = function (tweets) {
  // loops through tweets
  // if (tweets.length === 1) {
  //   let newTweet = createTweetElement(tweet);

  //   $("#tweet-container").append(newTweet)
  // }


  for (let tweet of tweets) {

    let newTweet = createTweetElement(tweet);

    $("#tweet-container").append(newTweet)
  }

  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}



//fix date later

const createTweetElement = function (tweet) {
  let daysAgo = function (tweet) {
    new Date(tweet["created_at"])
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
      <p>${8} Days ago</p>
      <div>
        <i class="fas fa-flag"></i>
        <i class="fas fa-share"></i>
        <i class="fas fa-heartbeat"></i>
      </div>
    </footer>
  </article>`)

  return $tweet;
}



$(document).ready(function () {
  const tweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }, {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }]

  //const $tweet = $(`<article class="tweet">Hello world</article>`);


  // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // console.log($('#tweet-container'));
  // $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  //renderTweets(data)
  renderTweets(tweetData)


});



//ajax handler

$(function () {
  $("div.under-tweetgarbage button").on('click', function () {
    console.log('Tweetclicked, performing ajax call...');
    $.ajax('index.js', { method: 'POST' })
      .then(function (sendsFormData) {
        let serializeForm = sendsFormData.serialize();
        $.preventDefault();
        console.log('Success: ', morePostsHtml);
        renderTweets(serializeForm);
      });
  });
});

// load tweets function

$(function () {
  $("section.new-tweet form").on('submit', function (event) {
    console.log('on submit')
    event.preventDefault();
    //lookup why event target superior to this keyword
    let serial = $(event.target).serialize();
    $.ajax("/tweets", {
      method: "POST",
    })
      .then(function (res) {
        console.log("tweet sent to server ")
      })
      .catch(function (err) {
        console.log("ajax load tweeter error")
      });
  });

});

// get the data sent

//promise

//.catch for error


//network dev toodls

// another round playing with ajax