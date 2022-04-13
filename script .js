// const api_url = "https://tango-comp.herokuapp.com/computers"
const api_url = "https://tango-comp.herokuapp.com/computers"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;

		table_data += `<td>${records[i][0]}</td>`;
		table_data += `<td>${records[i][1]}</td>`;
		table_data += `<td>${records[i][2]}</td>`;
		table_data += `<td>${records[i][3]}</td>`;
		table_data += `<td>${records[i][4]}</td>`;
		table_data += `<td>${records[i][5]}</td>`;
		table_data += `<td>${records[i][6]}</td>`;

		
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i][0]}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick="deleteData(${records[i][0]})">Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	//alert("Hello World");
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => {

		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	console.log(id)
	fetch(`${api_url}?id=${id}`)
	.then((response) => response.json())
	.then((data) => { 
		
		console.log(data);
		// console.log(data[0][2]);
		// document.getElementById("id").value = data[0][0];
		// document.getElementById("company").value = data[0][1];
		// document.getElementById("product").value = data[0][2];
		// document.getElementById("processor").value = data[0][3];
		// document.getElementById("ram").value = data[0][4];
		// document.getElementById("display").value = data[0][5];
		// document.getElementById("price").value = data[0][6];

	
	})

}


function postData() {
	
	var company = document.getElementById("company").value;
	var product = document.getElementById("product").value;
	var processor = document.getElementById("processor").value;
	var ram = document.getElementById("ram").value;
	var display = document.getElementById("display").value;
	var price = document.getElementById("price").value;
	
	data = {company:company, product:product, processor:processor, ram:ram, display:display, price:price};
	//data = {name:name, age:age, city:city, class:clas};
	
	console.log(data)
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	



function putData() {
	var id = document.getElementById("id").value;
	var company = document.getElementById("company").value;
	var product = document.getElementById("product").value;
	var processor = document.getElementById("processor").value;
	var ram = document.getElementById("ram").value;
	var display = document.getElementById("display").value;
	var price = document.getElementById("price").value;

	data = {id:id, company:company, product:product, processor:processor, ram:ram, display:display, price:price};

    //data = {id:id, name:name, age:age, city:city};
	console.log(data)

	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})

}

	

function deleteData(id) {
	user_input = confirm(` ${id} Are you sure you want to delete this record?`);
	if(user_input) {
		fetch(`${api_url}?id=${id}`, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({id : id})
		})
		.then((response) => response.json())
		.then((data) => {
			console.log(data); 
			window.location.href = "index.html";
		})
	}
 		// window.location.href = "index.html";	
}
