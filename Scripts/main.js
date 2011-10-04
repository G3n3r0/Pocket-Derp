window.onload = function(e) {
    var spd = [3,3];
    wid = 24;
    hei = 24;
    function E(a, b) {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }
    function touchHandler(event) {
        var touches = event.changedTouches,
            first = touches[0],
            type = "";
        switch(event.type) {
            case "touchstart": type = "mousedown"; break;
            case "touchmove":  type="mousemove"; break;        
            case "touchend":   type="mouseup"; break;
            default: return;
        }
        //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
        //           screenX, screenY, clientX, clientY, ctrlKey, 
        //           altKey, shiftKey, metaKey, button, relatedTarget);
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1, 
            first.screenX, first.screenY, 
            first.clientX, first.clientY, false, 
            false, false, false, 0/*left*/, null);
        first.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }
    //addEventListener('touchmove', function(e) { e.preventDefault(); }, true);
    document.ontouchmove = function(e) {
        //e.preventDefault();
        //document.onmousemove(e);
        touchHandler(e);
        //return false;
    };
    //document.addEventListener("touchstart", touchHandler, true);
    //document.addEventListener("touchmove", touchHandler, true);
    //document.addEventListener("touchend", touchHandler, true);
    //document.addEventListener("touchcancel", touchHandler, true);
    document.ontouchstart = touchHandler;
    document.ontouchend = touchHandler;
    document.ontouchcancel = touchHandler;
    function Player(x,y,img) {
        this.spd = spd;
        this.img = img;
        console.log(img);
        this.x = x;
        this.y = y;
        this.onGround = false;
        /*this.fdata = {
            1: 0,
            2: 1,
            3: 2,
            4: 3,
            5: 4
        };*/
        /*this.fdata = {
            f1: 0,
            f2: 1,
            f3: 2,
            f4: 3,
            b1: 4,
            b2: 5,
            b3: 6,
            b4: 7,
            w1: 8,
            w2: 9,
            w3: 10,
            w4: 11,
            e1: 12,
            e2: 13,
            e3: 14,
            e4: 15
        };*/
        this.fdata = {
            neutral: 0
        };
        this.sSheet = new SpriteSheet(this.img, 48, 48,this.fdata);
        this.width = 24;
        this.height = 24;
        //this.bs = new BitmapSequence(this.sSheet);
        //this.bs = new Bitmap(this.img);
        //this.bs.y = this.y;
        //this.bs.x = this.x;
        //this.bs.gotoAndStop("neutral");
        //this.bs.mouseEnabled = true;
        //this.bs.onClick = function(e) {
        //    e.onMouseMove = function(e2) {
        //        console.log(e,e2);
        //    };
        //};
        //stage.addChildAt(this.bs,2);
        this.g = new Graphics();
        this.g.beginFill("black");
        this.g.drawRoundRect(0,0,this.width,this.height,this.width/2,this.height/2);
        this.bit = new Shape(this.g);
        this.bit.x = canvas.width/2-this.width/2;
        this.bit.y = 0;
        this.bit.mouseEnabled = true;
        var t = this;
        this.bit.onPress = function(e) {
            //var b = this;
            e.onMouseMove = function(e2) {
                //console.log(e,e2);
                t.x = e2.stageX-t.width/2;
                t.y = e2.stageY-t.height/2;
                t.pressDown = true;
                //console.log(e2.stageY,b.y);
            };
            e.onMouseUp = function(e2) {
                t.pressDown = false;
            };
        };
        stage.addChild(this.bit);
        
        stage.update();
        //this.step = 1;
        this.update = function() {
            if(E(this,ground) && this.y<=ground.y-this.height) {
                //console.log("Bam",this.y,ground.y);
                this.onGround = true;
            } else if(!this.pressDown) {
                this.y += 3;
                this.onGround = false;
            }
            if(this.y>canvas.height) {
                this.y = 0;
            }
            this.bit.y = this.y;
            this.bit.x = this.x;
            stage.addChild(this.bit);
        };
    }
    
    canvas = document.getElementById("c");
    window.stage = new Stage(canvas);
    stage.enableMouseOver(10);
    
    window.tick = function() {
        for(var i=0;i<players.length;i++) {
            var player = players[i];
            player.update();
        }
        stage.update();
    };
    
    function imgLoaded(e) {
        console.log("So I herd u like Mudkips.");
        //console.log(window.player);
        //player.bit.scaleX = player.bit.scaleY = 0.5;
        //stage.addChild(player.image);
        /*player.img = this;
        player.bit = new Bitmap(player.img);
        player.bit.x = player.x;
        player.bit.y = player.y;
        //stage.addChild(player.bit);
        player.bit.mouseEnabled = true;
        player.bit.onClick = function(e) {
            console.log(e);
        };
        stage.addChild(player.bit);*/
        /*player.bit = new Bitmap(player.img);
        player.bit.scaleX = player.bit.scaleY = 0.5;
        player.bit.x = player.bit.y = 32;
        player.bit.mouseEnabled = true;
        player.bit.onClick = function(e) {
            //stage.removeChild(this);
            //init();
            //charSelect(faces);
            console.log("Derp");
            //stage.update();
        };
        stage.addChild(player.bit);*/
        stage.update();
        Ticker.setFPS(32);
        Ticker.addListener(window);
    }
    
    function init(g) {
        pImg = new Image();
        pImg.onload = imgLoaded;
        pImg.onerror = function(e,a) {
            console.log(e,a);
        };
        /*if(g) {
            pImg.src = "./Graphics/mudkipSprites3.png";
        } else {
            pImg.src = "./Graphics/nyan_cat4.png";
        }*/
        //pImg.src = "Graphics/mudkipSprites3.png";
        pImg.src = "Scripts/fillerGraphic.svg";
        window.players = [];
        window.players.push(new Player(canvas.width/2-wid/2,hei,pImg));
        //console.log(player);
        /*window.eImg = new Image();
        eImg.onload = enemLoaded;
        eImg.src = "./Graphics/enemSprite1.png";*/
        
        /*window.sco = new Text(neededKills-killCount, "18px Arial", "#FFF");
        sco.x = canvas.width-sco.getMeasuredWidth()-10;
        sco.y = sco.getMeasuredLineHeight();
        stage.addChild(sco);*/
        /*var h = new Graphics();
        h.beginFill("green");
        h.drawRoundRect(0,0,wid,hei,wid/2,hei/2);
        var block = new Shape(h);
        block.x = canvas.width-wid;
        block.y = 0;
        block.mouseEnabled = true;
        block.onPress = function(e) {
            /*e.onMouseUp = function(e2) {
                canvas.onclick = addObj;
            };*
            //addLink("http://www.google.com/");
            addObj("purple");
        };
        
        var f = new Graphics();
        f.beginFill("blue");
        f.drawRoundRect(0,0,wid,hei,wid/2,hei/2);
        var link = new Shape(f);
        link.x = canvas.width-wid*2-2;
        link.y = 0;
        link.mouseEnabled = true;
        link.onPress = function(e) {
            /*e.onMouseUp = function(e2) {
                canvas.onclick = addObj;
            };*
            var z = prompt("Enter a URL!","http://");
            if(z) {
                addLink(z,"pink");
            }
            //addObj("purple");
        };
        
        var m = new Graphics();
        m.beginFill("red");
        m.drawRoundRect(0,0,wid,hei,wid/2,hei/2);
        window.trash = new Shape(m);
        trash.x = canvas.width-wid;
        trash.y = canvas.height-hei;
        trash.width = wid;
        trash.height = hei;
        trash.mouseEnabled = true;*/
        
        var r = new Graphics();
        r.beginFill("brown");
        r.drawRect(0,0,canvas.width-wid*2,hei);
        window.ground = new Shape(r);
        ground.x = wid;
        ground.y = canvas.height-hei;
        ground.mouseEnabled = true;
        ground.width = canvas.width-wid*2;
        ground.height = hei;
        console.log("derp");
        
        var s = new Text("+", "38px Arial", "brown");
        s.mouseEnabled = true;
        s.x = 6;
        s.y = s.getMeasuredLineHeight()-6;
        //s.shadow = new Shadow("yellow", 0, 0, 6);
        var s2 = new Text("+", "38px Arial bold", "yellow");
        s2.mouseEnabled = true;
        s2.x = 6;
        s2.y = s.getMeasuredLineHeight()-6;
        s2.outline = true;
        //s.shadow = new Shadow("yellow", 0, 0, 6);
        s.onClick = function(e) {
            window.players.push(new Player(canvas.width/2-wid/2,hei,pImg));
        };
        
        //stage.addChild(block);
        //stage.addChild(link);
        //stage.addChild(trash);
        
        stage.addChild(ground);
        stage.addChild(s);
        stage.addChild(s2);
        stage.update();
    }
    init();
};