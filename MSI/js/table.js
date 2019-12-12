const regionSelect = document.getElementById('region-select');
const productSelect = document.getElementById('product-select');
const tableWrapper = document.getElementById('table-wrapper');

function tableData(){
	let selected = getSelected(),
		tableData = getDate(selected);
	return tableData;
}

function getDate(selected){
	let tableData = [],
		data = JSON.parse(localStorage.getItem('localData')) || sourceData;
	data.forEach(item => {
		if(selected[0].indexOf(item.region) > -1 && selected[1].indexOf(item.product) > -1)
			tableData.push(item);
	})
	return tableData;
}

function updateTable(){
	while(tableWrapper.firstChild){
    	tableWrapper.removeChild(tableWrapper.firstChild);
  	}
	let data = tableData();
	let table = document.createElement('table');
	let selected = getSelected();

	table.border = 1;
	table.insertRow(0);
	table.rows[0].insertCell(0);
	table.rows[0].cells[0].appendChild(document.createTextNode('商品'));
	table.rows[0].insertCell(1);
	table.rows[0].cells[1].appendChild(document.createTextNode('地区'));
	for(let i = 0; i < 12; i++){
		table.rows[0].insertCell(i+2);
		table.rows[0].cells[i+2].appendChild(document.createTextNode(i+1 + '月'));
	}

	let isRegionLonely = (selected[0].length == 1 && selected[0].length < selected[1].length);
	let isProductLonely = (selected[1].length == 1 && selected[0].length > selected[1].length);

	data.forEach((item, index) => {
		let tr = document.createElement("tr");
		if(isRegionLonely){
			if(index == 0){
				tr.innerHTML = "<td>" + item.product + "</td>" + "<td rowspan=" + data.length + ">" + item.region + "</td>";
			}
			else tr.innerHTML = "<td>" + item.product + "</td>";
		}else if(isProductLonely){
			if(index == 0){
				tr.innerHTML = "<td rowspan=" + data.length + ">" + item.product + "</td><td>" + item.region + "</td>";
			}
			else tr.innerHTML = "<td>" + item.region + "</td>";
		}else{
			tr.innerHTML = "<td>" + item.product + "</td><td>" + item.region + "</td>";
		}
		item.sale.forEach(item => {
			tr.innerHTML += "<td>" + item + "</td>";
		})

		table.appendChild(tr);
	})
	tableWrapper.appendChild(table);

	addEditIcon();
}

function addEditIcon(){
	let td = document.querySelectorAll("td");
	td.forEach(i => {
		if(!isNaN(i.innerHTML)){
			let editIcon = document.createElement('span');
 			editIcon.innerHTML = `<span class="edit-icon">
						  		<img src="img/edit.png" alt="">
							</span>`;
			i.appendChild(editIcon);
		}
	})
}

window.addEventListener('mouseover', function(e){
    let tr = document.querySelectorAll("tr"),
    	target = e.target;
    tr.forEach(item => {
    	item.style.backgroundColor = '#FFFFFF';
    })
    if(target.nodeName === 'TD'){
		let tr = target.parentNode;
		tr.style.backgroundColor = '#C5C5C5';
		let data = [...tr.childNodes].map(el => el.innerText).slice(2);
		lineChart(data);
    }else lineChart(tableData());
 });

window.addEventListener('click', function(e){
	let target = e.target;
	if(target.nodeName === 'TD' && !isNaN(target.childNodes[0].data)){
		editDate(target);
	}
})

function editDate(t){
	let temp = t.childNodes[0].data;
	 t.innerHTML = `<div id="inputBox">
		 			   <input id="data-input" type="text">
	                   <div id="input-icon">
	                     <i id="confirm"></i>
	                     <i id="cancel"></i>
	                   </div>
                   </div>`;
    let input = document.querySelector("#data-input");     
    input.focus();
    input.setAttribute('placeholder', temp);

    input.addEventListener('blur', callBack, false);

    input.addEventListener('keydown', function(e){
    	if (e.keyCode === 13){
			if (isNum(input.value)){
    			if (isNum(input.value)){
					input.removeEventListener('blur', callBack, false);
					t.innerHTML = input.value + `<span class="edit-icon">
						  							<img src="img/edit.png" alt="">
									  			</span>`;
					modifySourceData(t);				  			
				}
			}
		}
		if (e.keyCode === 27){
			t.innerHTML = temp;
		}
    });

    document.getElementById("confirm").addEventListener('mousedown', function(e){
    	if (isNum(input.value)){
			input.removeEventListener('blur', callBack, false);
			t.innerHTML = input.value + `<span class="edit-icon">
						  						<img src="img/edit.png" alt="">
									  	</span>`;
			modifySourceData(t);						  	
		}
    });
}

function callBack(e){
	let t = e.target.parentNode.parentNode;
	t.innerHTML = e.target.placeholder;
}

function isNum(value){
	if (/^\-?\d+(\.\d+)?$/.test(value)){
	return true;
	} else{
	alert('Input invalid!');
	return false;
	}
}

function modifySourceData(t){
	let tr = t.parentNode,
		editProduct = tr.childNodes[0].innerHTML,
		editRegion = tr.childNodes[1].innerHTML;

	let data = JSON.parse(localStorage.getItem('localData')) || sourceData;
	
	data.forEach(item => {
		if(item.product === editProduct && item.region === editRegion){
			for(let i = 0; i < 12; i++){
				item.sale[i] = tr.childNodes[i+2].childNodes[0].data;
			}
		}
	})

	let saveBtn = document.getElementById('save-btn');
	saveBtn.addEventListener('click', function(){
		modifyLocalData(data);
	}, false)
}

function modifyLocalData(data){
	localStorage.setItem('localData', JSON.stringify(data));
}



