
// Written very verbosely for longevity, apologies

trade = typeof trade !== 'undefined' ? trade : {}

trade.minimised         = false
trade.minimisedBorder   = 25     // what sticks out
trade.minimiseThreshold = 350

trade.goods             = []
trade.ports             = []
trade.rewards           = ['bound credits','sovereigns']
trade.optimiseNoGold    = true
trade.purse             = 100000
trade.cargo             = {}       // use actual trades.cargo
trade.cargoSize         = 100

trade.init = function() {
 trade.goods = trade.generateGoods()
 trade.ports = trade.generatePorts()

 trade.generateMap()
 trade.resize()
 trade.content()

 // UI styling
 // initial sampling, needed to move UI elements
 var t = trade.generateRequest('ctn-req-3',trade.goods[0]) 
 trade.generateWorksheet()
 // var s = trade.calculate(t)
 // log(s)
 
 // $('#ctn-request').css('top',30)
 
 trade.generateToggles()
}

trade.content = function() {
 var goodsList = trade.generateGoods({ignoreSovereigns: true}).sort()
 var portsList = trade.generatePorts({destinationPorts: true}).sort()
 
 var d = ''
 // Party Line
 d += '<div id="ctn-worksheet"></div>'
 d += '<div id="ctn-divider-2"></div>'
 d += '<div id="ctn-divider-1"></div>'
 d += '<div id="ctn-reference"></div>'
 d += '<div id="ctn-request">'
 d += '<span  id="ctn-req-1" class="ctn-req ">Deliver </span>'
 d += '<input id="ctn-req-2" class="ctn-req dev" value="5"></input>'
 d += '<div   id="ctn-req-3" class="ctn-req dropper " style="display: inline-block;">'//+goodsList[0]
 d +=   '<div id="ctn-req-3-text" class="ctn-req" style="display: inline-block;">'+goodsList[0]+'</div>'
 d +=   '<div id="ctn-req-3-list" class="" style="display: none;">'
 for (var k in goodsList) { var item = goodsList[k]; d += '<div id"ctn-req-3-'+item+'" class="elem" onclick="trade.changeRequest(\'ctn-req-3\',\''+item+'\')">'+item+'</div>' }
 d +=   '</div></div>'
 d += '<span  id="ctn-req-4" class="ctn-req "> to </span>'
 d += '<div   id="ctn-req-5" class="ctn-req dropper " style="display: inline-block;">'
 d +=   '<div id="ctn-req-5-text" class="ctn-req" style="display: inline-block;">'+portsList[0]+'</div>'
 d +=   '<div id="ctn-req-5-list" class="" style="display: none;">'
 for (var k in portsList) { var port = portsList[k]; port = port.replace("'","\'"); d += '<div id"ctn-req-5-'+port+'" class="elem" onclick="trade.changeRequest(\'ctn-req-5\',\''+port.replace("'","\\'")+'\')">'+port+'</div>' }
 d +=   '</div></div>'
 d += '<span  id="ctn-req-6" class="ctn-req "> for </span>'
 d += '<input id="ctn-req-7" class="ctn-req dev" value="60000"></input>'
 d += '<div   id="ctn-req-8" class="ctn-req dropper " tyle="display: inline-block;">'
 d +=   '<div id="ctn-req-8-text" class="ctn-req" style="display: inline-block;">'+trade.rewards[1]+'</div>'
 d +=   '<div id="ctn-req-8-list" class="" style="display: none;">'
 for (var k in trade.rewards) { var rwd = trade.rewards[k]; d += '<div id"ctn-req-8-'+rwd+'" class="elem" onclick="trade.changeRequest(\'ctn-req-8\',\''+rwd+'\')">'+rwd+'</div>' }
 d +=   '</div></div>'
 d += '</div>'
 $('#ctn').append(d)
 $('#ctn-request').css('left',trade.minimisedBorder + 5)
 $('#ctn-divider-1').css({
  left : trade.minimisedBorder+5,
  top  : trade.clean($('#ctn-request').css('height')) + trade.clean($('#ctn-request').css('top')) + 10,
 })
 $('#ctn-reference').css({
  top  : trade.clean($('#ctn-divider-1').css('top')) + 15,
 })
 $('#ctn-divider-2').css({
  left : trade.clean($('#ctn-reference').css('left')) + trade.clean($('#ctn-reference').css('width')) + 15,
  top  : trade.clean($('#ctn-reference').css('top')),
 })
 $('#ctn-worksheet').css({
  top  : trade.clean($('#ctn-divider-1').css('top')) + 15,
  left : trade.clean($('#ctn-reference').css('left')) + trade.clean($('#ctn-reference').css('width')) + 25,
 })

 var CTNREQ_3  = $('#ctn-req-3')
 var CTNREQ_3L = $('#ctn-req-3-list')
 var CTNREQ_5  = $('#ctn-req-5')
 var CTNREQ_5L = $('#ctn-req-5-list')
 var CTNREQ_8  = $('#ctn-req-8')
 var CTNREQ_8L = $('#ctn-req-8-list')
 
 CTNREQ_3.css('verticalAlign','top')
 CTNREQ_3.on( 'mouseover',  function(e, ui) { CTNREQ_3L.css('display','inline') })
 CTNREQ_3.on( 'mouseleave', function(e, ui) { CTNREQ_3L.css('display','none')   })
 
 CTNREQ_5.css('verticalAlign','top')
 CTNREQ_5.on( 'mouseover',  function(e, ui) { CTNREQ_5L.css('display','block') })
 CTNREQ_5.on( 'mouseleave', function(e, ui) { CTNREQ_5L.css('display','none')   })
 
 CTNREQ_8.css('verticalAlign','top')
 CTNREQ_8.on( 'mouseover',  function(e, ui) { CTNREQ_8L.css('display','inline') })
 CTNREQ_8.on( 'mouseleave', function(e, ui) { CTNREQ_8L.css('display','none')   });
 

 // Reference Line
 
 // Worksheet
 
}

trade.changeRequest = function(e, item) {
 // Make the necessary UI changes

 var elem = $('#'+e)
 $('#'+e+'-text').text(item)
 var REQ   = e
 var REQL  = e + '-list'
 var qREQ  = $('#'+REQ)
 var qREQL = $('#'+REQL)
 var list = []
 switch(e) { 
  case 'ctn-req-3':
   list = trade.generateGoods({ignoreSovereigns: true}).sort()
   break
  case 'ctn-req-5':
   list = trade.generatePorts({destinationPorts: true}).sort()
   break
  case 'ctn-req-8':
   list = trade.copy(trade.rewards).sort()
   break
  default:
   break
 }
 qREQL.remove()
 var d = '<div id="'+REQL+'" class="" style="display: none;">'
 for (var k in list) {
  var v = list[k]
  d += '<div id="'+REQ+'-'+v+'" class="elem"'
  d += 'onclick="trade.changeRequest(\''+REQ+'\',\''+v.replace("'","\\'")+'\')">'+v+'</div>'
 }
 d += '</div>'
 qREQ.append(d)
 qREQ.css('verticalAlign','top') // reassign qREQL here if necessary
 qREQ.on('mouseover', function(e, ui) { $('#'+REQL).css('display','inline') } )
 qREQ.on('mouseleave', function(e, ui) { $('#'+REQL).css('display','none') } )

 var x = trade.generateRequest(e,item)
 log(x)
 trade.generateWorksheet()
 // trade.generateWorksheet(t)
}

trade.generateWorksheet = function(col, row) {
 // log(col + ', ' + row)
 var firstDraw = false
 if (!col) { firstDraw = true }
 var col = col || 1
 var row = row || 1
 var unitHeight = 34
 var unitWidth = 153
 var leftOffset = 5
 var topOffset  = 10
 var d = ''
 
 /* First draw */
 if (firstDraw) {
  var current = $('#ctn-req-3-text').text()
  var ports = trade.retrievePorts(current)
  for (var i=0;i<ports.length;i++) {
   var t = ports[i]
   var s = t.port + ' << ' + t.cost
   var style = 'style="position: absolute; top: '+topOffset+'px; '
   style += 'left: '+(unitWidth*i + leftOffset)+'px; "'
   d += '<div id="ctn-ws-col'+(col+i)+'-row'+row+'" class="ctn-unit ctn-ws-unit" '
   d += 'onclick="trade.generateWorksheet('+(col+i)+','+(row)+')" '+style+'>'
   d += s+'</div>'
  }
  $('.ctn-ws-unit').remove()
  $('#ctn-worksheet').append(d)
 } else {
  d = ''
  var partial = 'ctn-ws'
  // Remove ACTIVE class for SAME row
  for (var i=1;i<40;i++) {
   var searchTerm = partial+'-col'+i+'-row'+row
   if ($('#'+searchTerm).length && $('#'+searchTerm).hasClass('active')) {
    $('#'+searchTerm).removeClass('active')
   }
   if (! $('#'+searchTerm).length) { break } // save some arbitrary shit
  }
  // Mark selected cell as active, there's a more efficient way but this is mentally easier to write
  var name = '#'+partial+'-col'+col+'-row'+row
  $(name).addClass('active')

  /*
    ARBITRARY ARBITRARY ARBITRARY 
    Remove Elements in Younger Rows
   */
  for (var i=1;i<30;i++) {
   for (var k=(row+1);k<30;k++) {
    var searchTerm = partial+'-col'+i+'-row'+k
    if ($('#'+searchTerm).length) { $('#'+searchTerm).remove() }
   }
  }
  /* END ARBITRARY */

  // Downfill
  var cellValue = $(name).text()
  var t = cellValue.split(' << ')
  var _ts = trade.retrievePorts(t[1])
  for (var i=0;i<_ts.length;i++) {
   var n = i+1
   var cycleTrades = _ts[i]
   var style = 'style="position: absolute; left: '+(leftOffset+unitWidth*i)+'px; '
   style += 'top: '+(topOffset+unitHeight*row)+'px;"'
   d += '<div id="ctn-ws-col'+n+'-row'+(row+1)+'" class="ctn-unit ctn-ws-unit"'
   d += 'onclick="trade.generateWorksheet('+n+','+(row+1)+')" '+style+'>'
   d += cycleTrades.port + ' << ' + cycleTrades.cost + '</div>'
  }
  $('#ctn-worksheet').append(d)
 }
}

trade.generateRequest = function(e, item) {
 // Now generate the new exchange
 /* Generating the reference path! */
 var finalOut = []
 if (e =='ctn-req-3' && trade.referencePaths[item]) { // Get the path only if the destination item changes
  var out = []
  var towards = ''
  var receipt = '' // initialize with the final item
  var loss = item
  var t = trade.referencePaths[item] 
  var s = t.split(' << ')
  for (var i=0;i<s.length;i++) {
    var x = s[i].split('~')
    receipt = x[0].toLowerCase()  // used in generating tradeList
    if (i > 0) { // assuming 'towards' would be filled here
     out.push({towards: towards, lose: x[0]})

          // populating the tradeList:
           //   locate the specified trade
           //   probably named these wrongly!
           // log(loss); log(outcome)
          if (trade.nodes[towards] && trade.nodes[towards].exch[loss]) {
           var nxt = trade.nodes[towards].exch[loss]
           for (var j=0;j<nxt.length;j++) {
            if (nxt[j].cost == receipt) {
             finalOut.push({port: towards, goods: loss, cost: receipt, receive: nxt[j].receive, lose: nxt[j].lose}) //   probably named these wrongly!
            }
           }
          }
    }

          loss = x[0].toLowerCase() // populating the tradeList:

    towards = x[1]
    // Fucking Tasur'ke
    if (towards == 'Tasurke') { towards = "Tasur'ke" }
  }
  // mentally easier for me to write for now
  var d = ''
  for (var i=0;i<out.length;i++) {
   var s = out[i].towards + ' << ' + out[i].lose.toLowerCase()
   var style = 'style="position: relative; top: '+8+'px;"'
   d += '<div id="" class="ctn-unit ctn-ref-unit" '+style+'>'+s+'</div>'
  } 
  // remove all ref-unit s
  $('.ctn-ref-unit').remove()
  $('#ctn-reference').append(d)
 }
 // log(finalOut)
 return finalOut
}

trade.resize = function() {
 /* Need computational improvements */
 var map = $('#map')
 var ctn = $('#ctn')
 var mw = map.width()
 var mh = map.height()
 var ww = $(window).width()
 var wh = $(window).height()
 
 if ((ww - mw - 5) < trade.minimiseThreshold) {
  //  shift to Minimized mode
  trade.minimised = true
  ctn.width( trade.minimiseThreshold )
  ctn.css('right', trade.minimisedBorder - trade.minimiseThreshold)
  ctn.addClass('minimise')
 } else {
  ctn.width( ww - mw - 5 )
  ctn.css('right',0)
  ctn.removeClass('minimise')
 }
}

trade.generateMap = function() {
 var map = $('#map')

 /* Draw Islands */ 
 for (var key in trade.nodes) {
  var t = trade.nodes[key] 
  var s = ''
  // Draw only if coordinates present
  if (t.x) {
    var tkey =key.replace("'",'').replace(' ','')

    var style = 'style="position: absolute; left: '+t.x+'%; top: '+t.y+'%;"'
    if (t.color) { style = style.replace('position: absolute;', 'background: '+t.color + '; position: absolute;') }
    var d = ''
    d += '<div id="node-'+tkey+'" class="mapNode" '+style+'>'
    style = 'style="position: absolute; left: 110%; top: -115%;"'
    d += '<div id="node-'+tkey+'-label" class="mapLabel" '+style+'>'+key+'</div>' // Label
    d += '</div>'
    map.append(d)
  }
 }

 /* Handle Mouse Events */
 $('.mapNode').on( 'mouseover', function(e) {
  var name = $(this).attr('id')
  var label = name+'-label'
  $('#'+label).css('display','block')
 })
 $('.mapNode').on( 'mouseleave', function(e) {
  var name = $(this).attr('id')
  var label = name+'-label'
  $('#'+label).css('display','none')
 })
}

trade.generateToggles = function() {
 // Stuff for toggles
 $("#map-displayLabels").change(function(e, ui) { 
  if (e.target.checked) {
   $('.mapLabel').css('display','none')
   $('.mapNode').on( 'mouseover', function(e) {
     var name = $(this).attr('id')
     var label = name+'-label'
     $('#'+label).css('display','block')
   })
   $('.mapNode').on( 'mouseleave', function(e) {
     var name = $(this).attr('id')
     var label = name+'-label'
     $('#'+label).css('display','none')
   })
  } else {
   $('.mapLabel').css('display','block')
   $('.mapNode').unbind('mouseleave mouseover')
  }
 })
 $('#squaredThree').click();
}

/* ----------------- */
/* Stable Functions  */
/* ----------------- */

trade.quantifyCargo = function(item) {
 var t = trade.cargo
 var n = 0
 for (var goods in t) { 
  if (item) { 
   if (goods == item) { n += t[goods] }
  } else {
   n += t[goods] }
 }
 return n
}

trade.retrievePorts = function(item) {
 var out = []
 var reference = trade.copy(trade.nodes)
 for (var key in reference) {
  var t = reference[key]
  if (t.exch && t.exch[item]) {
   for (var k=0;k<t.exch[item].length;k++) {
    var x = t.exch[item][k]
    out.push({port: key, goods: item, cost: x.cost, receive: x.receive, lose: x.lose})
   }
  }
 }
 return out
}

trade.generatePorts = function(options) {
 var out = []
 var destinationPorts = false
 if (options && options.destinationPorts) { destinationPorts = true }
 for (var key in trade.nodes) {
  if (destinationPorts) {
   if (trade.nodes[key].destinationPort) { out.push(key) }
  } else {
   out.push(key)
  }
 }
 return out
}

/*
trade.generateNode({key: 'Mysia',        x:   77, y:   50, color: 'rgba(100,140, 85,  1)', exch: {
   ceramics  : [
    { cost: 'silk',       lose: 3,    receive: 2, }, 
    { cost: 'porcelain',  lose: 4,    receive: 3, }, ], 
   tabac     : [
    { cost: 'silk',       lose: 3,    receive: 2, }, 
    { cost: 'porcelain',  lose: 4,    receive: 3, }, ], }    })
 */
trade.generateGoods = function(options) {
 var ignorables = []
 var ignoreGold = false
 if (options && options.ignoreSovereigns) { ignoreGold = true }

 var out = []
 for (var key in trade.nodes) {
  var t = trade.nodes[key]
  var e = t.exch
  for (var k in e) {
    var bool = true
    for (var j=0;j<e[k].length;j++) {
      if ($.inArray(e[k][j].cost,out) == -1) { 
        if (ignoreGold && e[k][j].cost == 'sovereigns') { bool = false; ignorables.push(k) } else { out.push(e[k][j].cost) } }
    }
    if ($.inArray(k,out) == -1) { if (bool) { out.push(k) } }
  }
 }
 /* Surely there's an easier way to delete */
 var deletable = []
 if (ignorables.length > 0) {
  for (var k=0;k<out.length;k++) {
   if ($.inArray(out[k],ignorables) != -1) { deletable.push(k) }
  }
 }
 if (deletable.length > 0) {
  for (var k=deletable.length-1;k>-1;k--) {
   out.splice(deletable[k],1)
  }
 }
 return out
}

/* ----------------- */
/* Utility Functions */
/* ----------------- */
trade.clean = function(n) {
 var x = Number(n.replace(/[^-\d\.]/g, ''))
 return x
}

trade.copy = function(obj) {
 var copy;
 if (null == obj || 'object' != typeof obj) return obj;
 if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy };
 if (obj instanceof Array) { copy = []; for (var i=0;i<obj.length;i++) { copy[i] = trade.copy(obj[i]) }; return copy };
 if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = trade.copy(obj[attr]) } }; return copy };
 throw new Error('Unable to copy obj! Type not supported.');
}