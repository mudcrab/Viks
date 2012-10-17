var g_resources = [{
    name: "grass",
    type: "image",
    src: "/assets/tiles/grass.png"
}, {
    name: "grass",
    type: "tmx",
    src: "/assets/test1.tmx"
}, {
    name: "player",
    type: "image",
    src: "/assets/tiles/player.png"
}];
 
var jsApp = {
    /* ---
 
     Initialize the jsApp
 
     --- */
    onload: function() {
 
        // init the video
        if (!me.video.init('gameDisplay', $(window).width(), $(window).height(), false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }
 
        // initialize the "audio"
        me.audio.init("mp3,ogg");
 
        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);
 
        // set all resources to be loaded
        me.loader.preload(g_resources);
 
        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },
 
    /* ---
 
     callback when everything is loaded
 
     --- */
    loaded: function() {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
 me.entityPool.add("mainPlayer", PlayerEntity);
             
   // enable the keyboard
   me.input.bindKey(me.input.KEY.A,  "left");
   me.input.bindKey(me.input.KEY.D, "right");
   me.input.bindKey(me.input.KEY.W,  "up");
   me.input.bindKey(me.input.KEY.S, "down");
        // start the game
        me.state.change(me.state.PLAY);
    }
 
};
// jsApp
/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({
 
    onResetEvent: function() {
        // stuff to reset on state change
	me.levelDirector.loadLevel("grass");
    },
 
    /* ---
 
     action to perform when game is finished (state change)
 
     --- */
    onDestroyEvent: function() {
    }
 
});
 
//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});