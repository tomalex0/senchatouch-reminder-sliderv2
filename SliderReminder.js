Ext.define('Ext.slider.SliderInfo', {
	extend : 'Ext.slider.Slider',
	xtype : 'sliderinfo',
	config :{
		indexSelectedCls : 'x-index-selected',
		cls : Ext.baseCSSPrefix+'sliderinfo',
		sliderLabel : null
	},
	getElementConfig : function() {

		var self = this;
		var config = self.callParent(),numitem = [];
		config.children[0]['children'] = [];
		
		
		config.children[0]['children'].push({
			reference : 'sliderdatacontainer',
			tag : 'div',
			cls : Ext.baseCSSPrefix +'slider-data-container',
			children : [{
			tag : 'div',
			reference : 'sliderdatawrap',
			cls : Ext.baseCSSPrefix +'data-wrap'
		}]

		});
		return config;
	},
	updateMinValue:function(value){
		for(i=this.getMinValue();i<=this.getMaxValue();i++){
            this.sliderdatawrap.createChild({
                html: (i) .toString() //space before dot to fix the string issue
            });
        }
   },
   refreshOffsetValueRatio: function() {
        var valueRange = this.getMaxValue() - this.getMinValue(), 
            trackWidth = this.elementWidth - this.thumbWidth, me = this, increment =  this.getIncrement();
		
//        this.offsetValueRatio = (trackWidth / valueRange) * increment;
	this.offsetValueRatio = (trackWidth / valueRange) ;
//console.log(this.getIncrement())
        //console.log(this.offsetValueRatio,"sdfsd");
        //Ext.get(Ext.DomQuery.select('.x-slider-data-container li')).setStyle('margin-left','20px')
        //Ext.get(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div')).setStyle('width',this.offsetValueRatio+'px');
        //Ext.get(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div:first-child')).setStyle('margin-left','0px');
        // Ext.get(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div:last-child')).setStyle('padding-left','0px');
        Ext.each(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div'),function(item,i){
		console.log(me.offsetValueRatio);
//        	Ext.get(item).setStyle('left',(me.offsetValueRatio * (i*increment) )+'px');
		Ext.get(item).setStyle('left',(me.offsetValueRatio * i)+'px');
		});	
   },
   onThumbDrag: function(thumb, e, offsetX) {
   		//console.log(offsetX,"blahblah Drag");
        var index = this.getThumbIndex(thumb),
            offsetValueRatio = this.offsetValueRatio,
            constrainedValue = this.constrainValue(offsetX / offsetValueRatio);
	    console.log(constrainedValue);
		//console.log(thumb.translatableBehavior.translatable.x,"onThumbDrag");
        e.stopPropagation();

        this.setIndexValue(index, constrainedValue);

        this.fireEvent('drag', this, thumb, this.getValue(), e);
		this.updateSelectedIndex(this.getValue());
        return false;
   },
   onTap: function(e) {
        if (this.isDisabled()) {
            return;
        }

        var targetElement = Ext.get(e.target);
	
        if (!targetElement || targetElement.hasCls('x-thumb')) {
            return;
        }
	

        var touchPointX = e.touch.point.x,
            element = this.element,
            elementX = element.getX(),
            offset = touchPointX - elementX - (this.thumbWidth / 2),
            value = this.constrainValue(offset / this.offsetValueRatio),
            values = this.getValue(),
            minDistance = Infinity,
            ln = values.length,
            i, absDistance, testValue, closestIndex, oldValue, thumb;

        if (ln === 1) {
            closestIndex = 0;
        }
        else {
            for (i = 0; i < ln; i++) {
                testValue = values[i];
                absDistance = Math.abs(testValue - value);

                if (absDistance < minDistance) {
                    minDistance = absDistance;
                    closestIndex = i;
                }
            }
        }
	
        oldValue = values[closestIndex];
        thumb = this.getThumb(closestIndex);

        this.setIndexValue(closestIndex, value, this.getAnimation());
        this.refreshThumbConstraints(thumb);

        if (oldValue !== value) {
            this.fireEvent('change', this, thumb, value, oldValue);
        }
	console.log(value,"vaky");
        this.updateSelectedIndex(value);
   },
   refreshValue: function() {
        this.refreshOffsetValueRatio();
        this.setValue(this.getValue());
        console.log(this.getValue()[0]);
        this.updateSelectedIndex(this.getValue());
   },
    updateSelectedIndex :  function(value){
	//var calculated_val  = value/this.getIncrement();
	var calculated_val  = value;
	console.log(calculated_val);
    	Ext.get(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div')).removeCls(this.getIndexSelectedCls());
		Ext.get(Ext.DomQuery.select('.x-slider-data-container .x-data-wrap div')[calculated_val]).addCls(this.getIndexSelectedCls());
    }
});