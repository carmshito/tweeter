/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#all-tweets').append($tweet);
    }
  };

  // takes a tweet object and returns a HTML tweet <article>
  const createTweetElement = function(tweetData) {
    const $tweet = $(`
    <article class="tweet">
      <header class="user-info">
        <img class="avatar" src="${tweetData.user.avatars}" alt="user avatar">
        <h3 class="username">${tweetData.user.name}</h3>
        <p class="user-handle">${tweetData.user.handle}</p>
      </header>
      <div class="tweet-content">
        <p>${tweetData.content.text}</p>
      </div>
      <footer>
        <span class="time-stamp">${tweetData.created_at}</span>
        <div class="icons">
          <i class="fa-sharp fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
    );
    return $tweet;
  };

  renderTweets(data);

  // submit tweet event
  // add an event listener that listens for the submit event
  $('#tweet-form').on('submit', (event) => {

    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();
    
    // create an AJAX POST request in client.js that sends the form data to the server.
    $.ajax("/tweets", {
      method: "POST",
      // Serialize the form data
      data: $("#tweet-text").serialize(),
    });
    $('#tweet-text').val("");
  });
});