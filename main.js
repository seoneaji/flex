var wrap = document.querySelector('.wrap');
var flexParent = Array.prototype.slice.call(document.querySelectorAll('.flex-parent'));
var flexChildren = Array.prototype.slice.call(document.querySelectorAll('.flex-child'));
var flexNthChild = Array.prototype.slice.call(document.querySelectorAll('.flex-child:nth-child(2)'));

var controlsContainer = document.querySelector('.controls-container');
var propertyInputs = Array.prototype.slice.call(document.querySelectorAll('[data-css-ctr]'));

var preview = document.querySelector('.preview pre');
var previewChild = document.querySelector('.preview-child pre');
var previewNthChild = document.querySelector('.preview-nth-child pre');
var styleObj = {};
var styleObjChild = {};
var styleObjNthChild = {};

var childCount = document.getElementById('ChildCount');
var removeBtn = document.querySelectorAll('[data-remove]');
var removeAllBtn = document.querySelectorAll('[data-remove-all]');
var stepBtn = document.querySelectorAll('[data-step-btn]');


function updateCodePreview(input) {
	var parent = input.closest("fieldset");
	if (parent.dataset.childCss == null){
		var updataTarget = flexParent;
		var updataPreveiwObj = preview;
		var updataStyleObj = styleObj;
	} else if (parent.dataset.childCss == "2") {
		var updataTarget = flexNthChild;
		var updataPreveiwObj = previewNthChild;
		var updataStyleObj = styleObjNthChild;
	} else {
		var updataTarget = flexChildren;
		var updataPreveiwObj = previewChild;
		var updataStyleObj = styleObjChild;
	}

	parent.classList.add("on");

	if (parent.hasAttribute("data-shorthand")){
		var longhand = document.querySelectorAll("fieldset[data-longhand='"+parent.dataset.shorthand+"']");
		longhand.forEach(function(fieldset, i) {
			//removeProperty(fieldset)
		});
	} else if (parent.hasAttribute("data-longhand")) {
		var shorthand = document.querySelectorAll("fieldset[data-shorthand='"+parent.dataset.longhand+"']");
		shorthand.forEach(function(fieldset, i) {
			//removeProperty(fieldset)
		});
	}


	if (input.name === "flex") {
		var shorthand = parent.querySelectorAll("[name='flex']");
		var val = "";
		shorthand.forEach(function(child, i) {
			val += child.value + " ";
		});
		updataStyleObj[parent.dataset.property] = val;
		updataTarget.forEach(function(target) {
			target.style[parent.dataset.property] = val;
		});
	} else {
		updataStyleObj[input.name] = input.value;
		updataTarget.forEach(function(target) {
			target.style[input.name] = input.value;
		});

	}
	updataPreveiw(updataStyleObj, updataPreveiwObj);
}





function updataPreveiw(updataStyleObj, updataPreveiwObj){
	//console.log(updataStyleObj)
	//console.log(updataPreveiwObj)
	if (updataStyleObj == null || updataPreveiwObj == null) return;
	var previewCss = JSON.stringify(updataStyleObj, null, '\t');
	updataPreveiwObj.innerHTML = previewCss
						.replace(/"/g, '')
						.replace(/,/g, ';')
						.replace(/(align-content.*)(\n)/, '$1;\n');


}
var inputListener = function(evt) {
	updateCodePreview(evt.target);
};

propertyInputs.forEach(function(input) {
	input.addEventListener('change', inputListener);
	input.addEventListener('input', inputListener);
});

removeBtn.forEach(function(btn) {
	btn.addEventListener('click', function(evt) {
		var fieldset = this.closest("fieldset");
		removeProperty(fieldset);
	});
});
stepBtn.forEach(function(btn) {
	btn.addEventListener('click', function(evt) {
		var step = this.dataset.stepBtn;
		wrap.className ="";
		wrap.classList.add("wrap", "step"+step);
	});
});

function removeProperty(fieldset){
	if (fieldset.dataset.childCss == null){
		var updataTarget = flexParent;
		var updataPreveiwObj = preview;
		var updataStyleObj = styleObj;
	} else if (fieldset.dataset.childCss == "2") {
		var updataTarget = flexNthChild;
		var updataPreveiwObj = previewNthChild;
		var updataStyleObj = styleObjNthChild;
	} else {
		var updataTarget = flexChildren;
		var updataPreveiwObj = previewChild;
		var updataStyleObj = styleObjChild;
	}
	var property = fieldset.dataset.property;
	var ipt = fieldset.querySelectorAll('[name='+property+']');
	fieldset.classList.remove("on");
	ipt.forEach(function(ipt) {
		if (ipt.type === "radio"){
			ipt.checked = false;
		} else {
			ipt.value = "";
		}
	});
	updataTarget.forEach(function(target) {
		target.style.removeProperty(fieldset.dataset.property)
	});
	delete updataStyleObj[fieldset.dataset.property];
	updataPreveiw(updataStyleObj, updataPreveiwObj);
}

childCount.value = 5;
childCount.addEventListener('change', function(evt) {
	childLength();
});
childLength();
function childLength(){
	flexChildren.forEach(function(child, i) {
		if (i >= childCount.value) {
			child.classList.add('hide');
		} else {
			child.classList.remove('hide');
		}
	});
}
