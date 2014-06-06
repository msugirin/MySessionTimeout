Ext.define('MySessionTimeout.controller.Login', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            logInButton: 'component[itemId=logInButton]'
        },
        control: {
            logInButton:{
                tap: 'onLoginTap'
            }
        }
    },
    //called when the Application is launched, remove if not needed
    onLoginTap: function(){
        Ext.Viewport.animateActiveItem(
            {
                xtype: 'main',
            },
            {
                type: 'slide',
                direction: 'left'
            }
        );
    }
});
