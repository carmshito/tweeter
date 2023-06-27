/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // takes unsafe characters and re-encodes the text to a safe representation
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    
    // empty all-tweets container to stop duplications of tweets
    $('#all-tweets').empty();
    
    // loops through tweets
    for (const tweet of tweets) {
      
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      
      // takes return value and appends it to the tweets container
      $('#all-tweets').prepend($tweet);
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
        <p>${escape(tweetData.content.text)}</p>
      </div>
      <footer>
        <span class="time-stamp">${timeago.format(tweetData.created_at)}</span>
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

  // function responsible for fetching tweets from /tweets
  const loadTweets = function() {
    const url = `http://localhost:8080/tweets`;
    $.ajax({
      url,
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        renderTweets(tweets);
      }
    });
  };

  // load tweets from database
  loadTweets();

  // submit tweet event
  // add an event listener that listens for the submit event
  $('#tweet-form').on('submit', function(event) {

    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();

    const $formData = $('#tweet-form');

    const wordLimit = 140;
    const textInputLength = $('#tweet-text').val().length;

    // if data is empty
    if (!textInputLength) {
      $('#error-empty')
        .slideDown()
        .show()
        .delay(3000)
        .slideUp('slow');

      // if tweet is exceeds max characters of 140
    } else if (textInputLength > wordLimit) {
      $('#error-too-long')
        .slideDown()
        .show()
        .delay(3000)
        .slideUp('slow');

    } else {
      // Serialize the form data
      const data = $formData.serialize();

      // create an AJAX POST request in client.js that sends the form data to the server.
      $.post("/tweets", data)
        .then(res => {
          loadTweets();
          $('#tweet-text').val('');
          $('.counter').val(wordLimit);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});