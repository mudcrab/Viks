window.Debug = {
    isShowing: false,
    size: {
        width: 400,
        height: 500
    },
    html_ : '<div id="debugWindow"><div id="debugContent"></div></div>',
    init: function()
    {
        jQuery('body').append(this.html_);
        jQuery('#debugWindow').width(this.size.width);
        jQuery('#debugWindow').height(this.size.height);
        jQuery('#debugWindow').show();

        if (typeof console  != "undefined") 
            if (typeof console.log != 'undefined')
                console.olog = console.log;
            else
                console.olog = function() {};

        console.log = function(message) {
            console.olog(message);
            jQuery('#debugContent').append('<pre>' + message + '</pre>');
            jQuery('#debugContent').animate({ scrollTop: jQuery('#debugContent')[0].scrollHeight }, '10');
        };
        console.error = console.debug = console.info =  console.log

        // console.log('Debug window showing');
        this.isShowing = true;
    },
    showDebug: function()
    {
        jQuery('#debugWindow').fadeIn();
        this.isShowing = true;
    },
    hideDebug: function()
    {
        jQuery('#debugWindow').fadeOut();
        this.isShowing = false;
    },
    setSize: function(width_, height_)
    {
        this.size.width = width_;
        this.size.height = height_;
        jQuery('#debugWindow').width(this.size.width);
        jQuery('#debugWindow').height(this.size.height);
        jQuery('#debugContent').height(this.size.height - 20);
    },
    toggle: function()
    {
        if(this.isShowing)
        {
            this.hideDebug();
        }
        else
        {
            this.showDebug();
        }
    }
};
window.Util = {
    objToString: function(obj)
    {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + ' : ' + obj[p] + '\n';
            }
        }
        return str;
    }
};