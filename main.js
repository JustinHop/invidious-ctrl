const controller = (player) => {
  var player = document.querySelector(player);

  document.addEventListener('keydown', (e) => {

    // Don't fire keyboard controls if focus is in search field
    if(document.querySelector('#search-input') === document.activeElement) {
      return(false);
    }

    let key = e.keyCode;

    switch (true) {
      case(key == 70): // F
        document.webkitIsFullScreen ? player.webkitExitFullscreen() : player.webkitEnterFullscreen();
        break;
      case(key >= 48 && key <= 57): // 0-9
        player.currentTime = Math.round(player.duration*((key-48)/10));
        break;
      case(key == 75): // K
        player.paused ? player.play() : player.pause();
        break;
      case(key == 39): // right arrow
        player.currentTime += 5;
        break;
      case(key == 37): // left arrow
        player.currentTime -= 5;
        break;
      case(key == 74): // J
        player.currentTime -= 10;
        break;
      case(key == 76): // L
        player.currentTime += 10;
        break;
      case(key == 77): // K
        player.volume == 0 ? player.volume = 1 : player.volume = 0;
        break;
    }
  }, false);
}

// Wait for HookTube player to be ready
const observer = new MutationObserver(function(mutations) {
  if (document.contains(document.querySelector('#player-obj'))) {
    document.activeElement.blur();
    controller('#player-obj');
    observer.disconnect();
  }
});

observer.observe(document, {attributes: false, childList: true, characterData: false, subtree:true});