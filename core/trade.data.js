
trade = typeof trade !== 'undefined' ? trade : {}

trade.copy = function(obj) {
 var copy;
 if (null == obj || 'object' != typeof obj) return obj;
 if (obj instanceof Date) { copy = new Date(); copy.setTime(obj.getTime()); return copy };
 if (obj instanceof Array) { copy = []; for (var i=0;i<obj.length;i++) { copy[i] = trade.copy(obj[i]) }; return copy };
 if (obj instanceof Object) { copy = {}; for (var attr in obj) { if (obj.hasOwnProperty(attr)) { copy[attr] = trade.copy(obj[attr]) } }; return copy };
 throw new Error('Unable to copy obj! Type not supported.');
}

trade.nodes = {
   Aalen               : {},
   Ageiro              : {},
   Ashtan              : {},
   Colchis             : {},
 ['Clockwork Isle']    : {},
 ['Eastern Shore']     : {},
   Eirenwaar           : {},
   Harae               : {},
   Ilyrean             : {},
   Karbaz              : {},
 // 
   Lothos              : {},
   Minos               : {},
   Mysia               : {},
 ['New Hope']          : {},
   Orilla              : {},
   Phereklos           : {},
   Polyargos           : {},
   Prin                : {},
   Riparium            : {},
 ['Sea Lion Cove']     : {},
 ['Shala-Khulia']      : {},
   Shastaan            : {},
 ['Ship Arena Island'] : {},
   Suliel              : {},
   Tapoa               : {},
 ["Tasur'ke"]          : {},
   Thraasi             : {},
   Tuar                : {},
   Ulangi              : {},
   Umbrin              : {},
   Valho               : {},
   Zanzibaar           : {},
   Zaphar              : {},
}

trade.generateNode = function(o) {
 trade.nodes = trade.nodes || {}
 trade.nodes[o.key] = trade.copy(o)
 if (trade.nodes[o.key].color) { trade.nodes[o.key].colour = trade.nodes[o.key].color } // fucking English
}

trade.referencePaths = {
  armaments : 'ARMAMENTS~Umbrin << WINE~Minos << MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  ceramics  : 'CERAMICS~Karbaz << HONEY~Minos << SALT~Zaphar',
  // cotton    : '',
  fruits    : 'FRUITS~Zanzibaar << ORE~Thraasi',
  fur       : 'FUR~Suliel << WOOL~Tasurke',
  gems      : 'GEMS~Shastaan << PERFUME~Colchis << INCENSE~Shala-Khulia << GLASS~Thraasi << FRUITS~Zanzibaar << ORE~Thraasi',
  /*alt: GEMS~Ageiro << TABAC~Mysia << SILK~Colchis << MARBLE~Karbaz << GRANITE~Tasurke << SANSTONE~Shastaan*/
  glass     : 'GLASS~Thraasi << FRUITS~Zanzibaar << ORE~Thraasi',
  // grain     : '',
  granite   : 'GRANITE~Tasurke << SANDSTONE~Shastaan',
  hemp      : 'HEMP~Shastaan << FUR~Suliel << WOOL~Tasurke',
  honey     : 'HONEY~Minos << SALT~Zaphar',
  incense   : 'INCENSE~Shala-Khulia << GLASS~Thraasi << FRUITS~Zanzibaar << ORE~Thraasi',
  kawhe     : 'KAWHE~Tasurke << SUGAR~Zaphar << GRAIN~Thraasi',
  marble    : 'MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  // ore       : '',
  porcelain : 'PORCELAIN~Umbrin << CERAMICS~Karbaz << HONEY~Minos << SALT~Zaphar',
  perfume   : 'PERFUME~Colchis << INCENSE~Shala-Khulia << GLASS~Thraasi << FRUITS~Zanzibaar << ORE~Thraasi',
  // salt      : '',
  // sandstone : '',
  silk      : 'SILK~Colchis << MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  spices    : 'SPICES~Zanzibaar << ARMAMENTS~Umbrin << WINE~Minos << MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  sugar     : 'SUGAR~Zaphar << GRAIN~Thraasi',
  tabac     : 'TABAC~Mysia << SILK~Colchis << MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  tea       : 'TEA~Zanzibaar << TERRACOTTA~Orilla << COTTON~Shastaan',
  terracotta: 'TERRACOTTA~Orilla << COTTON~Shastaan',
  wine      : 'WINE~Minos << MARBLE~Karbaz << GRANITE~Tasurke << SANDSTONE~Shastaan',
  // wool      : '',
}

trade.generateNode({key: 'Ageiro',       x:    6, y:   45, color: 'rgba( 25,255,225,  1)', destinationPort: false, 
   exch: {
   gems      : [
    { cost: 'tabac',      lose: 2,    receive: 1, }, ],
   silk      : [
    { cost: 'tabac',      lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Colchis',      x:   69, y:   25, color: 'rgba( 45,175,115,  1)', destinationPort: false, 
   exch: {
   glass     : [
    { cost: 'incense',    lose: 3,    receive: 2, }, ],
   perfume   : [
    { cost: 'incense',    lose: 3,    receive: 2, }, ],
   silk      : [
    { cost: 'marble',     lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Karbaz',       x:  9.2, y:   12, color: 'rgba( 45, 75,115,  1)', destinationPort: false, 
   exch: {

   ceramics  : [
    { cost: 'hemp',       lose: 3,    receive: 2, }, 
    { cost: 'honey',      lose: 3,    receive: 2, }, ],
   marble    : [
    { cost: 'granite',    lose: 3,    receive: 2, }, 
    { cost: 'hemp',       lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Minos',        x:   58, y:   19, color: 'rgba(100, 10, 20,  1)', destinationPort: false, 
   exch: {
   honey     : [
    { cost: 'salt',       lose: 4,    receive: 3, }, ], 
   wine      : [
    { cost: 'marble',     lose: 3,    receive: 2, }, 
    { cost: 'tea',        lose: 3,    receive: 2, }, ],}     })

trade.generateNode({key: 'Mysia',        x:   79, y:   50, color: 'rgba(100,140, 85,  1)', destinationPort: false, 
   exch: {
   ceramics  : [
    { cost: 'silk',       lose: 3,    receive: 2, }, 
    { cost: 'porcelain',  lose: 4,    receive: 3, }, ], 
   tabac     : [
    { cost: 'silk',       lose: 3,    receive: 2, }, 
    { cost: 'porcelain',  lose: 4,    receive: 3, }, ], }    })

trade.generateNode({key: 'Orilla',       x:   62, y:   83, color: 'rgba(165,100, 35,  1)', destinationPort: false, 
   exch: {
   terracotta: [
    { cost: 'cotton',     lose: 4,    receive: 3, }, ], }    })

trade.generateNode({key: 'Shala-Khulia', x:   29, y: 57.5, color: 'rgba(145, 25,125,  1)', destinationPort: false, 
  exch: {
   incense: [
    { cost: 'glass',      lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Shastaan',     x:   62, y:   48, color: 'rgba(200,  5, 25,  1)', destinationPort: true, 
  exch: {
   cotton    : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ],
   gems      : [
    { cost: 'perfume',    lose: 2,    receive: 1, }, ],
   hemp      : [
    { cost: 'fur',        lose: 4,    receive: 3, }, ],
   sandstone : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ],
   wine      : [
    { cost: 'perfume',    lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Suliel',       x:   46, y:    3, color: 'rgba(190,235,255,  1)', destinationPort: false, 
  exch: {
   fur      : [
    { cost: 'wool',       lose: 1,    receive: 1, }, ], 
   incense  : [
    { cost: 'kawhe',      lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: "Tasur'ke",     x:   60, y:   35, color: 'rgba(175,155, 35,  1)', destinationPort: true, 
  exch: {
   granite  : [
    { cost: 'sandstone',  lose: 4,    receive: 3, }, ],
   kawhe     : [
    { cost: 'sugar',      lose: 3,    receive: 2, }, ],
   wool     : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ], }    })

trade.generateNode({key: 'Thraasi',      x:   32, y: 43.5, color: 'rgba( 75,110, 45,  1)', destinationPort: true, 
  exch: {
   armaments : [
    { cost: 'spices',     lose: 2,    receive: 1, }, ],
   glass     : [
    { cost: 'fruits',     lose: 3,    receive: 2, }, ],
   grain    : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ],
   ore      : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ], }    })

trade.generateNode({key: 'Umbrin',       x: 68.5, y:   21, color: 'rgba( 25,180, 70,  1)', destinationPort: false, 
  exch: {
   armaments: [
    { cost: 'wine',       lose: 3,    receive: 2, }, ],
   kawhe    : [
    { cost: 'wine',       lose: 3,    receive: 2, }, ],
   porcelain: [
    { cost: 'ceramics',   lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Zanzibaar',    x:   80, y:   55, color: 'rgba( 75, 25,155,  1)', destinationPort: false, 
  exch: {
   fruits   : [
    { cost: 'ore',        lose: 4,    receive: 3, }, ],
   incense  : [
    { cost: 'armaments',  lose: 3,    receive: 2, }, ],
   perfume  : [
    { cost: 'gems',       lose: 2,    receive: 1, }, ],
   spices   : [
    { cost: 'armaments',  lose: 2,    receive: 1, }, ],
   tea      : [
    { cost: 'terracotta', lose: 3,    receive: 2, }, ], }    })

trade.generateNode({key: 'Zaphar',       x:   73, y:   68, color: 'rgba( 60, 60,100,  1)', destinationPort: false, 
  exch: {
   sugar    : [
    { cost: 'grain',      lose: 4,    receive: 3, }, ],
   salt     : [
    { cost: 'sovereigns', lose: 1000, receive: 1, }, ], }    })
 
