Ext.require([
    'Ext.form.Panel',
    'Ext.form.FieldSet',
    'Ext.field.Text',
    'Ext.field.Password',
    'Ext.field.Email',
    'Ext.field.Url',
    'Ext.field.Checkbox',
    'Ext.field.Spinner',
    'Ext.field.Select',
    'Ext.field.Hidden',
    'Ext.field.TextArea',
    'Ext.field.Slider',
    'Ext.field.Toggle',
    'Ext.field.Radio',
    'Ext.Button',

    'Ext.data.Store'
]);




Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
    	Ext.create('Ext.Container', {
	    	fullscreen: true,
	    	scrollable:true,
	     	items: [
	         {
	              docked: 'top',
	              xtype: 'titlebar',
	              title : 'Reminder Slider'
	         },
	         {
                xtype: 'sliderinfo',
                name: 'height',
                minValue: 0,
	            maxValue: 20,
	            increment: 1,
	            value: 2
            }]
	 });
       
    }
});