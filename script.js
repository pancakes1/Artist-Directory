let x = document.getElementById("add_artist_box");
x.style.display = "none";


const addArtistClicked = () => {
	let y = document.getElementById('add_artist_box');
	if (y.style.display == "none"){
		y.style.display = "block";
	} else{ 
		x.style.display = "none";
	}
}

const savedArtist = (artist) =>{
		
		let card = document.createElement('div');	
		card.classList.add('clearfix');
		card.id = artist.id;
		
		let artImg = document.createElement('img');
		artImg.classList.add('URLimg');
		artImg.src = artist.img;
		artImg.alt = 'artist';
		
		let artName = document.createElement('div');
		artName.id ='displayedArtistName';
		var textName =document.createTextNode(artist.name);
		artName.appendChild(textName);
		
		let artAbt = document.createElement('p');
		artAbt.classList.add('description');
		var textAbt = document.createTextNode(artist.abt);
		artAbt.appendChild(textAbt);
		
		let del = document.createElement('a');
		del.id = artist.del;
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
		artist.main.appendChild(card);
	
		document.getElementById(artist.id).addEventListener('click', function(){
		var data = localStorage.getItem('dataKey')
		if (data){
			data = JSON.parse(data);
			data.splice(artist.dataTag,1);
		}
		localStorage.setItem('dataKey', JSON.stringify(data));
		document.getElementById(artist.id).remove();
		
	});
}

const addClicked = () =>{
	let main = document.getElementById('artistBox');
	let name = document.getElementById('artistName').value;
	let about = document.getElementById('abtArtist').value;
	let img = document.getElementById('imgURL').value;
	let delBtn = document.getElementById('delButton').value;
	const id = Date.now();
	let dataTag = ''
	let artist = {id, name, about, img, delBtn, main, dataTag};
	savedArtist(artist);
	
	var data = {'name':name, 'about': about, 'img':img, "id":id}
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

window.addEventListener('load',reload);	
function reload() {
	var dataList= window.localStorage.getItem("dataKey");
	let main = document.getElementById('artistBox');
	let del = document.getElementById('delButton').value;
	if (dataList == null){
		dataList = [];
	}else{
		dataList = JSON.parse(dataList);
	}
	for (var i = 0; i<dataList.length; i++){
		var id = dataList[i].id;
		var name = dataList[i].name;
		var abt = dataList[i].about;
		var img = dataList[i].img;
		var dataTag = i;
		let artist = {id, name, abt, img, del, main, dataTag};
		savedArtist(artist);
	}
	
}

const searchBtn = () =>{
	var userSearch = document.getElementById('userSearch').value;
	var dataList = window.localStorage.getItem('dataKey');
	if (dataList == null){
		dataList = [];
	}else{
		dataList = JSON.parse(dataList);}
		
	for (var i = 0; i<dataList.length; i++){
		var name = dataList[i].name;
		var id = dataList[i].id;
		let main = document.getElementById(id);
		var included = name.includes(userSearch);

		if (included == false){
			main.style.display = "none";
		}
		else{
			main.style.display = "block";
		}

	}
}
