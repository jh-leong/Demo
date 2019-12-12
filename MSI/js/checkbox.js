function checkBox(container){
	let singleSel = container.querySelectorAll("[checkbox-type=single]");
	let allSel = container.querySelector("[checkbox-type=all]");

	container.addEventListener("change", function(){
		let checkedbox = [...singleSel].filter(item => item.checked),
			target = event.target;
		if(target.getAttribute("checkbox-type") === "all"){
			for(let i = 0; i < singleSel.length; i++) singleSel[i].checked = true;
			if(checkedbox.length == singleSel.length) allSel.checked = true;
		}else{
			if(checkedbox.length == singleSel.length) allSel.checked = true;
			else if(checkedbox.length == 0) target.checked = true;
			else allSel.checked = false;
		}
	})
}

function getSelected(){
	let region = [],
		product = [];

	document.getElementById("region-select").querySelectorAll("[checkbox-type=single]").forEach(item => {
		if(item.checked){
			region.push(item.value);
		}
	})
	document.getElementById("product-select").querySelectorAll("[checkbox-type=single]").forEach(item => {
		if(item.checked){
			product.push(item.value);
		}
	})
	return [region,product];
}