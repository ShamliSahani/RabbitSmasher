import { HolesPosX, HolesPosY} from "./Resource";

var isSpawned = true;
export var score = 0;
var SpawnCounters = 0;
var isHit = false;

cc.Class({
    extends: cc.Component,

    properties: {
        bunny: {
            default: null,  
            type: cc.Node,
            serializable: true,  
        },
        collider: {
            default: null,  
            type: cc.BoxCollider,
        },
        anim:{
            type:cc.Animation,
            default: null,
        },
        stars:
        {
            type: cc.Node,
            default: null,
        },
        HitSfx:
        {
            type: cc.AudioSource,
            default: null,
        },
        ScoreLabel:
        {
            type: cc.Label,
            default: null,
        },
        hearts:
        {
            type: cc.Node,
            default: [],
        }
    },

    onLoad () {
        this.ScoreLabel.string = score;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    start () {
        this.stars.opacity = 0;
        this.scheduleOnce(function(){
            isSpawned = false;
        },1,1);

        this.collider.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            let touchLoc = touch.getLocation();
            if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
               
                if(this.bunny.opacity > 0 )
                {
                    this.stars.opacity = 255;
                    score = score + 2; 
                    this.ScoreLabel.string = score;
                    this.anim.play("StarRotation");
                    this.HitSfx.play();
                    this.schedule(function() {
                        this.stars.opacity = 0;
                        this.bunny.opacity = 0;
                    },1);
                    isHit = true; 
                } 
            }   
        }, this);

    },

    update (dt) {
        this.SpawnPlayer();
        switch (SpawnCounters)
        {
            case 1: this.hearts[0].color = new cc.Color(0, 0, 0);
            break;
            case 2: this.hearts[1].color = new cc.Color(0, 0, 0);
            break;
            case 3: this.hearts[2].color = new cc.Color(0, 0, 0);
            break;
        }
        if(SpawnCounters > 3)
        {
            cc.director.loadScene("GameOver");
        }
    },
    SpawnPlayer()
    {
        if(isSpawned == false)
        {
            var num = Math.floor(Math.random() * 8) + 0;
            this.bunny.setPosition(HolesPosX[num],HolesPosY[num]);
            this.bunny.opacity = 255;
            isSpawned = true;
            this.scheduleOnce(function() {
                this.bunny.opacity = 0;
                if(isHit == false)
                {
                    SpawnCounters = SpawnCounters + 1;
                }
                this.scheduleOnce(function(){
                    isSpawned = false;    
                    isHit = false;      
                },2,1,10);
                
            },1,1,30);
        }
    },
});
