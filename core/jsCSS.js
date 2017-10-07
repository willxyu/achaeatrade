function loadCSS(href) {
  var css = $('<link>', {
    'rel'   :  'stylesheet',
    'type'  :  'text/css',
    'href'  :  href,
  })[0];
  document
    .getElementsByTagName('head')[0]
    .appendChild(css);
}


reloadCSS = function() {
  var list = [
    'core/csMain.css',
  ]
  for (var i=list.length;i>-1;i--) {
    loadCSS(list[i]);
  }
}

reloadCSS()