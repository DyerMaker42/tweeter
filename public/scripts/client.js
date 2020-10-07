/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const renderTweets = function(tweets) {
  // loops through tweets
  for(let tweet of tweets){
    
    tweets[tweet]= createTweetElement(tweet);
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}




const createTweetElement = function(tweet) {
  let $tweet = /* Your code for creating the tweet element */
  // ...
  return $tweet;
}



$(document).ready(function () {
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }
  
  const $tweet = $(`<article class="tweet">Hello world</article>`);


// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
console.log($('#tweet-container'));
$('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

//renderTweets(data)



});