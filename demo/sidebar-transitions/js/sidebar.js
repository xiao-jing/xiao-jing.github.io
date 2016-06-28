var sidebarEffects = (function(){

	function hasParentClass(ele,cName){
		if(ele === document){return false;}
		if(handy.hasClass(ele,cName)){return true;}
		return ele.parentNode && hasParentClass(ele.parentNode,cName);
	}

	function init(){

		var container = document.getElementById('container'),
			buttons = Array.prototype.slice.call(document.querySelectorAll('#effects > button')),
			resetMenu = function(){
				handy.removeClass(container, 'menu-open');
			},
			bodyClickFn = function(eve){
				if(!hasParentClass(eve.target, 'menu')){
					resetMenu();
					EventUtil.removeHandler(document, 'click', bodyClickFn);
				}
			};

		buttons.forEach( function(ele, index) {
			var effect = ele.getAttribute('data-effect');
			EventUtil.addHandler(ele, 'click', function(eve){
				EventUtil.stopPropagation(eve);
				EventUtil.preventDefault(eve);
				container.className = 'container';
				handy.addClass(container, effect);
				setTimeout(function(){
					handy.addClass(container, 'menu-open');
				}, 25 );
				EventUtil.addHandler(document, 'click', bodyClickFn);
			});
		});
	}
	
	init();
})();