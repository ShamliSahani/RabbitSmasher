export var audioManager = cc.Class({
    extends: cc.Component,
    ctor(){},
    properties: {
       BG: {
            type: cc.AudioSource,
            default: null
        },
    },

    // onLoad () {},
    
    start () {
        this.playBG();
    },
    playBG: function () {
        this.BG.play();
    },
  
});

