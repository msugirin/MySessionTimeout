Ext.define('MySessionTimeout.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'MySessionTimeout'
            },
            {
                xtype: 'label',
                itemId: 'timer',
                style: 'margin: 0 auto;'
            }
        ]
    }
});
