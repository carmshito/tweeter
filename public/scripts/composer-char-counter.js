$(document).ready(function() {
  $('textarea').on('keyup', function() {
    const currentWordCount = $(this).val().length;
    const counter = $(this).parent().find(".counter");
    const remainingWordCount = 140 - currentWordCount;
    counter.text(remainingWordCount);
    if (remainingWordCount < 0) {
      counter.addClass('over');
    } else {
      counter.removeClass('over');
    }
  });
});