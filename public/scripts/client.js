/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [];

  const renderTweets = function(tweets) {
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
        <p>${tweetData.content.text}</p>
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

  renderTweets(data);

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

  loadTweets();

  // submit tweet event
  // add an event listener that listens for the submit event
  $('#tweet-form').on('submit', function(event) {

    // prevent the default behaviour of the submit event (data submission and page refresh)
    event.preventDefault();

    const $formData = $('#tweet-form');
    console.log($formData);

    const wordLimit = 140;
    const textInputLength = $('#tweet-text').val().length;

    // if data is empty
    if (!textInputLength) {
      alert('You need to write something down!');

      // if tweet is exceeds max characters of 140
    } else if (textInputLength > wordLimit) {
      alert('Your tweet is too long! Please shorten it! 😋');
    
    } else {
      // Serialize the form data
      const data = $formData.serialize();
      console.log(data);

      // create an AJAX POST request in client.js that sends the form data to the server.
      $.post("/tweets", data)
        .then(res => {
          loadTweets();
          $('#tweet-text').val('');
        })
        .catch(err => {
          console.log(err);
        });
    }
  });

});