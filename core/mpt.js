
  mpt = typeof mpt !== 'undefined' ? mpt : {}

  mpt.preformedpath = function(goodtype) {

   var refpaths = trade.referencePaths
   var data     = trade.nodes

   var goodtype = goodtype || '' 
   var finalout = []
   var out = []
   
   var towards = ''
   var receipt = ''
   var loss = goodtype
   var t = refpaths[goodtype]
   var s = t.split(' << ')
   for (var i=0;i<s.length;i++) {
     var x = s[i].split('~')
     receipt = x[0].toLowerCase()
     if (i > 0) {
       out.push({towards: towards, lose: x[0]})
       if (data[towards] && data[towards].exch[loss]) {
        var next = data[towards].exch[loss]
        for (var j=0;j<next.length;j++) {
         if (next[j].cost == receipt) {
          finalout.push({port: towards, goods: loss, cost: receipt, receive: next[j].receive, loss: next[j].lose})
         }
        }
       }
     }
     loss = x[0].toLowerCase()
     towards = x[1]
     if (towards == 'Tasurke') {towards = "Tasur'ke"}
    }
    return finalout
  }
  
  mpt.update = function(target, item) {
   // gdi tasurke
   if (item == 'Tasurke') { item = "Tasur'ke" }
   $(target).text(item)
   $(target+'-list').css('display','none')
   var t = mpt.preformedpath()
   mpt.calculate(t)
  }
  
  mpt.quantifyCargo = function(cargo,item) {
   var t = cargo
   var n = 0
   for (var goods in t) { 
    if (item) { 
     if (goods == item) { n += t[goods] }
     } else {
      n += t[goods] }
   }
   return n
  }
  
  mpt.calculate = function(query) {
   var trades     = query.trades
   var packetSize = query.packetSize || false
   var cargosize  = query.cargosize
   log('Path')
   log(trades)
   /*
   var packetSize = packetSize
   if ($('#req-quant').length) { packetSize = parseInt($('#req-quant').text()) }

   var cargosize = parseInt($('#opt-cargo').text()) */
   var cargo     = {}
   var t = trades || []
   var capacity = cargosize - mpt.quantifyCargo(cargo)
   
   var count = capacity
   var finaltype = ''
   for (var i=(t.length-1);i>-1;i--) {
    if (count != capacity /* We've started trading! */) {
     count = cargo[t[i].cost]
     var remainder = count % t[i].loss
     if (remainder == 0) { delete cargo[t[i].cost] } else {
     cargo[t[i].cost] = remainder }
    }
    var maxi = count / t[i].loss * t[i].receive
    cargo[t[i].goods] = Math.floor(maxi)
    if (count == capacity /* We've started trading! */) {
     count = mpt.quantifyCargo(cargo, t[i].goods)
    }
    if (i == 0) { finaltype = t[i].goods }
   }
   log('Cargo')
   log(cargo)
   
   /* Reverse Engineer if there is a packetSize */
   var parcel = 0
   var shadowcargo = {}

   if (packetSize) {
    var n = mpt.quantifyCargo(cargo, finaltype)
    var multiples = Math.floor(n/packetSize)
    /* Expand */
    parcel = multiples * packetSize
    for (var i=0;i<t.length;i++) {
     var s = t[i]
     parcel = Math.ceil(parcel * t[i].loss / t[i].receive)
     
    }
 
    count = parcel
    for (var i=(t.length-1);i>-1;i--) {
     if (count != parcel /* We've started trading! */) {
      count = shadowcargo[t[i].cost]
      var remainder = count % t[i].loss
      if (remainder == 0) { delete shadowcargo[t[i].cost] } else {
      shadowcargo[t[i].cost] = remainder }
     }
     var maxi = count / t[i].loss * t[i].receive
     shadowcargo[t[i].goods] = Math.floor(maxi)
     if (count == parcel /* We've started trading! */) {
      count = mpt.quantifyCargo(shadowcargo, t[i].goods)
     }
    }
   }
   if (parcel) { log(parcel); log(shadowcargo) }
   
   query.cargo  = cargo
   query.parcel = parcel
   query.shadowcargo = shadowcargo
   return query
  }

  mpt.locatePort    = function(query) {
   var data     = trade.nodes

   var forwardport = query.forwardport
   var item        = query.item
   var out = []
   // log(forwardport)
   // log(item)
   for (var key in data) {
     var t = data[key]
     if (t.exch && t.exch[item]) {
      out.push(key)
     }
   }
   return out
  }
