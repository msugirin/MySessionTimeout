Ext.define('MySessionTimeout.view.Login', {
    extend: 'Ext.Panel',
    xtype: 'login',
    requires: ['Ext.form.FieldSet', 
            'Ext.form.Password',
            'Ext.Label', 
            'Ext.Img', 
            'Ext.util.DelayedTask',
            'Ext.field.Email',
            'Ext.field.Toggle',
            'Ext.field.Hidden'
    ],
    config: {

        items: [
            {
                xtype: 'fieldset',
                title: 'Login',
                itemId: 'loginForm',
                //itemId: 'loginForm',
                name: 'loginForm',
                //style: 'width:80%; text-align: center',
                instructions: '<a href="#" id="forgotPassword">Forgot or don\'t have your password?</a>',
                items: [
                    {
                        xtype: 'emailfield',
                        placeHolder: 'Username',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                        //value: ''
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'hiddenUserField',
                        name: 'hiddenUserField'
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                        //value: ''
                    },
                    {
                        xtype: 'togglefield',
                        itemId: 'rememberMe',
                        label: 'Remember me?',
                        labelWidth: 200,
                        name: 'rememberMe',
                        value: 0
                        
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                style: 'margin: 15px auto',
                width: '250px',
                formBind: true,
                buttonAlign: 'center',
                text: 'Sign On'
            }
        ]
    }
});
