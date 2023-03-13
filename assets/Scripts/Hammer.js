cc.Class({
    extends: cc.Component,

    properties: {
       Hammer: {
            default:null,
            type: cc.Node,
            serializable: true,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('mousedown', this.MoveHammer, this);
    },

    start () {},

    // update (dt) {},

    MoveHammer(event)
    {
        this.Hammer.setPosition(event._x,event._y);
    },
});


