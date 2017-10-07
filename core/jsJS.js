function loadJS(url) {
 var s = $('<script>', {
  'type'  :  'text/javascript',
  'src'   :  url,
 })[0];
 document
  .getElementsByTagName('head')[0]
  .appendChild(s);
}

mreload = function() {
  var list = [
   // CORE
   './core/util.js',
   './core/jsCSS.js',         // css script
   './core/trade.js',
   './core/trade.data.js',
   './core/mpt.js',
  ]
  var started = false
  list.reduce( function(p, item) {
   return p.then( function() {
    return loadJS(item)
   })
  }, Promise.resolve()).then( function() {
   console.log('All done.')
  })
}

mreload()

/* https://stackoverflow.com/a/17715395
jQuery.fn.verticalAlign = function () {
 return this.css("margin-top",($(this).parent().height() - $(this).height())/2 + 'px' ) }
  */

/* https://stackoverflow.com/a/19116617
function getElsAt(top, left){
    return $("body")
               .find("*")
               .filter(function() {
                           return $(this).offset().top == top 
                                    && $(this).offset().left == left;
               });
} */

/* simple plugin: not sure where I got this from, but was critical at one stage in development */
/*
(function($){
  $.fn.outside = function(ename, cb){
    return this.each(function(){
      var $this = $(this),
      self = this;
      $(document).bind(ename, function tempo(e){
        if(e.target !== self && !$.contains(self, e.target)){
          cb.apply(self, [e]);
          if(!self.parentNode) $(document.body).unbind(ename, tempo);
        }
      });
    });
  };
}(jQuery));
 */
 
/* 
  Useful code lines:
    b = [a, a = b][0];                       // swaps two variables
    vr = typeof vr !== 'undefined' ? vr : {} // hard declaration
 */
 
 /* https://stackoverflow.com/a/10834618/6881999
 $.Deferred()
.then(function () { return $.getScript("/script1"); })
.then(function () { return $.getScript("/scirpt2"); })
.then(function () { return $.getScript("/script3"); })
.resolve(); */