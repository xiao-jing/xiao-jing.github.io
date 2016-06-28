/**
 * [EventUtil 一部分跨浏览器事件对象]
 * @type {Object}
 */
var EventUtil = {
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attchEvent){
			element.attachEvent('on' + type, handler);
		}else{
			element['on' + type] = handler;
		}
	},
	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent('on' + type, handler);
		}else{
			element['on' + type] = null;
		}
	},
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelable = true;
		}
	}
};
/**
 * [handy 一些常用方法总结]
 * @type {Object}
 */
var handy = {
	hasClass: function(ele, cName){
		if(ele.className){
			return ele.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
		}
		return false;
	},
	addClass: function(ele, cName){
		if(!handy.hasClass(ele, cName)){
			ele.className += " " + cName; 
		}
	},
	removeClass: function(ele, cName){
		if(handy.hasClass(ele,cName)){
			ele.className = ele.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), "");
		}
	},
	replaceClass: function(ele, oldName, newName){
		if(handy.hasClass(ele, oldName)){
			handy.removeClass(ele, oldName);
			handy.addClass(ele, newName);
		}
		return;
	},
	toggleClass: function(ele, oldName, newName){
		if(handy.hasClass(ele, oldName)){
			handy.replaceClass(ele, oldName, newName);
		}else if(handy.hasClass(ele, newName)){
			handy.replaceClass(ele, newName, oldName);
		}else{
			handy.addClass(ele, oldName);
		}
	},
	$: function(name){
		if(name.charAt(0) === '#'){
			var a = name.slice(1);
			return document.getElementById(a);
		}else{
			var a = name.slice(1);
			return this.getByClass(a);
		}
	},
	getByClass: function(cName){
		eles = [];
		elements = document.getElementsByTagName('*');
		for(var i = 0, l = elements.length; i < l.length; i++){
			if(elements[i].className.match(cName)){
				eles.push(elements[i]);
			}
		}
	} 
};