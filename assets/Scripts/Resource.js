export var HolesPosX = [];
export var HolesPosY = [];

cc.Class({
    extends: cc.Component,

    properties: {
        Holes: {
            default: [], 
            type: cc.Node,
            serializable: true,
        },
    },

    // onLoad () {},

    start () {
        for(let i = 0; i < 9;i++)
        {
            HolesPosX[i] = this.Holes[i].position.x;
            HolesPosY[i] = this.Holes[i].position.y;
        }
    },

    // update (dt) {},
});
