

   commaThis = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

   rpad = function(str,len,char) {
    if (typeof str == "number") { str = str.toString() }
    if (char == null) { char = ' ' }
    var r = len - str.length
    if (r < 0) { r = 0 }
    return str + char.repeat(r)
   }

   lpad = function(str, len, char) {
    if (typeof str == "number") { str = str.toString() }
    if (char == null) { char = ' ' }
    var r = len - str.length
    if (r < 0) { r = 0 }
    return char.repeat(r) + str
   }

   clean = function(n) {
    var x = Number(n.replace(/[^-\d\.]/g, ''))
    return x
   }