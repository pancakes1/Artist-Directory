let x = document.getElementById("add_artist_box");
x.style.display = "none";


const addArtistClicked = () => {
	let y = document.getElementById('add_artist_box');
	if (y.style.display == "none"){
		y.style.display = "block";
	}
	else{ 
		x.style.display = "none";
	}
}

const savedArtist = (artistId, artistName, artistAbt, artistImg, deleteBtn, main, dataTag) =>{
	
		let card = document.createElement('div');	
		card.classList.add('clearfix');
		card.id = artistId;
		
		let artImg = document.createElement('img');
		artImg.classList.add('URLimg');
		artImg.src = artistImg;
		artImg.alt = 'artist';
		
		let artName = document.createElement('div');
		artName.id ='displayedArtistName';
		var textName =document.createTextNode(artistName);
		artName.appendChild(textName);
		
		let artAbt = document.createElement('p');
		artAbt.classList.add('description');
		var textAbt = document.createTextNode(artistAbt);
		artAbt.appendChild(textAbt);
		
		let del = document.createElement('a');
		del.id = deleteBtn;
		del.classList.add('deleteButton');
		var textDel = document.createTextNode('Delete');
		del.appendChild(textDel);
		
		let descr = document.createElement('div');
		descr.classList.add('description');
		descr.appendChild(artName);
		descr.appendChild(artAbt);
		descr.appendChild(del);
		
		card.appendChild(artImg);
		card.appendChild(descr);
		main.appendChild(card);
	
		document.getElementById(artistId).addEventListener('click', function(){
		var data = localStorage.getItem('dataKey')
		if (data){
			data = JSON.parse(data);
			data.splice(dataTag,1);
		}
		localStorage.setItem('dataKey', JSON.stringify(data));
		document.getElementById(artistId).remove();
		
	});
}

const addClicked = () =>{
	let x = document.getElementById('artistBox');
	let name = document.getElementById('artistName').value;
	let about = document.getElementById('abtArtist').value;
	let img = document.getElementById('imgURL').value;
	let delBtn = document.getElementById('delButton').value;
	const start = Date.now();
	let dataTag = '' 
	savedArtist(start, name, about, img, delBtn, x, dataTag);
	
	var data = {'name':name, 'about': about, 'img':img, "id":start}
	var dataList= window.localStorage.getItem("dataKey");

	if (dataList == null){
		dataList = [];
	}else{
		dataList = JSON.parse(dataList);
	}

	dataList.push(data);
	dataTag += 1; 
	window.localStorage.setItem("dataKey",JSON.stringify(dataList));
	

console.log(dataList);
	
}

/*var retrieveData = window.localStorage.getItem("dataKey");
console.log(JSON.parse(retrieveData));*/


window.addEventListener('load',reload);	
function reload() {
	var dataList= window.localStorage.getItem("dataKey");
	let x = document.getElementById('artistBox');
	let delBtn = document.getElementById('delButton').value;
	if (dataList == null){
		dataList = [];
	}else{
		dataList = JSON.parse(dataList);
	}
	for (var i = 0; i<dataList.length; i++){
		var artistId = dataList[i].id;
		var artistName = dataList[i].name;
		var artistAbt = dataList[i].about;
		var artistImg = dataList[i].img;
		var dataTag = i;
		savedArtist(artistId, artistName, artistAbt, artistImg, delBtn, x, dataTag);

	}
	
}



