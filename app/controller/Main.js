Ext.define('MySessionTimeout.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            main: 'main',
            timer: 'component[itemId=timer]'
        },
        control: {
            main:{
                activate: 'mainActivate'
            }
        }
    },
    
    mainActivate: function() {
        var me = this;
        var viewPort = Ext.get('ext-viewport');
        viewPort.on(['touchstart', 'touchend', 'touchmove',
                        'swipe', 'dragstart', 'drag', 'dragend',
                        'tap', 'singletap', 'doubletap', 'longpress', 'pinch', 'rotate'],
        'onViewPortEvent', this);
        var task1 = Ext.create('Ext.util.DelayedTask', function() {
            if (MySessionTimeout.app.idleSec < 1 && MySessionTimeout.app.idleMin > 0) {
                MySessionTimeout.app.idleMin--;
                MySessionTimeout.app.idleSec = 60;
            }
            //Logging out once the timer reaches 1sec
            if (MySessionTimeout.app.idleMin == 0 && MySessionTimeout.app.idleSec == 1) {
                if(debugC) console.log('task1 cancel');
                me.onSessionTimeout('Signing out due to inactivity..');
                task1.cancel();
                task2.cancel();
            }
            //Display a Prompt to the user if the minute counter hits 0
            if(MySessionTimeout.app.idleMin == 0 && MySessionTimeout.app.sessionPromptShowing == 0){
                MySessionTimeout.app.sessionPromptShowing = 1;
                Ext.Msg.confirm("MySessionTimeout", "Your session is about to expire, do you want to continue?",
                    function ( answer ) {
                        if(answer == 'yes'){
                            MySessionTimeout.app.idleMin = MySessionTimeout.app.settingsIdleMin;
                            MySessionTimeout.app.idleSec = MySessionTimeout.app.settingsIdleSec;
                            MySessionTimeout.app.sessionPromptShowing = 0;
                        }
                        else{
                            MySessionTimeout.app.sessionPromptShowing = 0;
                            me.onSessionTimeout('Signing out..');
                        }
                    }
                );
            }
            MySessionTimeout.app.idleSec--;
            me.getTimer().setHtml('      minutes: ' + MySessionTimeout.app.idleMin + '    seconds: ' + MySessionTimeout.app.idleSec);
             
            task2.delay(1000);
         
        }, this);
        var task2 = Ext.create('Ext.util.DelayedTask', function() {
            var dif; 
            if(MySessionTimeout.app.currentTime != null && MySessionTimeout.app.currentTime != undefined)
                dif = Ext.Date.diff(MySessionTimeout.app.currentTime,Ext.Date.now(),Ext.Date.SECOND);
            else {
                dif = 0;
                MySessionTimeout.app.currentTime = Ext.Date.now();
            }
            if(dif > 5){
                if(dif > MySessionTimeout.app.idleMin * 60){
                    me.onSessionTimeout('Signing out due to inactivity..');
                }
                else{
                    MySessionTimeout.app.currentTime = Ext.Date.now();
                    var min = Math.round(dif / 60);
                    var sec = dif - Math.round(dif / 60) * 60;
                    MySessionTimeout.app.idleMin = MySessionTimeout.app.idleMin - min;
                    MySessionTimeout.app.idleSec = MySessionTimeout.app.idleSec - sec;
                }
            }
            else{
                MySessionTimeout.app.currentTime = Ext.Date.now();
            }
            if (MySessionTimeout.app.idleSec < 1 && MySessionTimeout.app.idleMin > 0) {
                MySessionTimeout.app.idleMin--;
                MySessionTimeout.app.idleSec = 60;
            }
            if (MySessionTimeout.app.idleMin == 0 && MySessionTimeout.app.idleSec == 1) {
                me.onSessionTimeout('Signing out due to inactivity..');
                task2.cancel();
                task1.cancel();
            }
            MySessionTimeout.app.idleSec--;
            me.getTimer().setHtml('      minutes: ' + MySessionTimeout.app.idleMin + '    seconds: ' + MySessionTimeout.app.idleSec);
             
            task1.delay(1000);
         
        }, this);
         
        task1.delay(1000);        
    },
    onViewPortEvent: function(e, target, options, eventController) {
        if(MySessionTimeout.app.sessionPromptShowing == 0){
            MySessionTimeout.app.idleMin = MySessionTimeout.app.settingsIdleMin;
            MySessionTimeout.app.idleSec = MySessionTimeout.app.settingsIdleSec;
        }
    },
    onSessionTimeout: function(logoutMsg){
        window.location.reload();
    }
});
