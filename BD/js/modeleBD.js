let txtSerie = document.getElementById("serie");
let txtNumero = document.getElementById("numero");
let txtTitre = document.getElementById("titre");
let txtAuteur = document.getElementById("auteur");
let txtPrix = document.getElementById("prix");
let txtId = document.getElementById("id");
let imgAlbum = document.getElementById("album");
let imgAlbumMini = document.getElementById("albumMini");
let numSerie;
let affichageAlbumMini = '';

$(document).ready(function ($) {
	const srcImg = "images/"; // emplacement des images de l'appli
	const albumDefaultMini = srcImg + "noComicsMini.jpeg";
	const albumDefault = srcImg + "noComics.jpeg";
	const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
	const srcAlbum = "albums/"; // emplacement des images des albums en grand

	// Affichage des BD
	
	imgAlbum.addEventListener("error", function () {
		prbImg(this)
	});

	imgAlbumMini.addEventListener("error", function () {
		prbImg(this)
	});

	txtId.addEventListener("change", function () {
		getAlbum(this)
	});


	/**
	 * Récupération de l'album par son id et appel de 
	 * la fonction d'affichage
	 * 
	 * @param {number} num 
	 */
	function getAlbum(num) {
		
		var album = albums.get(num.value);
		console.log(album); // récupère toutes les données de l'album

		if (album === undefined) {
			txtSerie.value = "";
			txtNumero.value = "";
			txtTitre.value = "";
			txtAuteur.value = "";
			txtPrix.value = 0;

			afficheAlbums($("#albumMini"), $("#album"),	albumDefaultMini, albumDefault);

		} else {

			var serie = series.get(album.idSerie);
			console.log(serie); // Numéro de série de l'album en cours d'affichage
		
			var auteur = auteurs.get(album.idAuteur);
			console.log(auteur); // Nom de la série de l'album en cours d'affichage
				
			txtSerie.value = serie.nom;
			txtNumero.value = album.numero;
			txtTitre.value = album.titre;
			txtAuteur.value = auteur.nom;
			txtPrix.value = album.prix;
			numSerie = album.idSerie;

			var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

			// Utilisation d'une expression régulière pour supprimer 
			// les caractères non autorisés dans les noms de fichiers : '!?.":$
			nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

			afficheAlbums($("#albumMini"), $("#album"), srcAlbumMini + nomFic + ".jpg",	srcAlbum + nomFic + ".jpg");
		}	
	}

	/**
	 * Affichage des images, les effets sont chainés et traités
	 * en file d'attente par jQuery d'où les "stop()) et "clearQueue()" 
	 * pour éviter l'accumulation d'effets si défilement rapide des albums.
	 * 
	 * @param {object jQuery} $albumMini 
	 * @param {object jQuery} $album 
	 * @param {string} nomFic 
	 * @param {string} nomFicBig 
	 */
	function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
		$album.stop(true, true).clearQueue().fadeOut(100, function () {
			$album.attr('src', nomFic);
			$albumMini.stop(true, true).clearQueue().fadeOut(150, function () {
				$albumMini.attr('src', nomFicMini);
				$albumMini.slideDown(100, function () {
					$album.slideDown(100);
				});
			}) 
		});
		
		afficheSerie(album)
	}	
	

});

let letitre = txtTitre.value;
let laserie = txtSerie.value;
let leprix = txtPrix.value;
let lid = txtId.value;
let listePrix = new Array();
let listeAlbum = new Array();
let listeAlbumimg = new Array();
// console.log(listeAlbum);
// console.log(listeAlbumimg);

function afficheSerie() {
	// pour tous les albums ayant le même numéro de série, tous les afficher
	let deathrow = ""
	if (txtSerie.value == "") {
		document.getElementById('death').innerHTML = '<div><img src="images/noComicsMini.jpeg"/></div>';
	} else {
	albums.forEach(album => {
	    serie = series.get(album.idSerie);
		// console.log(letitre); // trouver la clef de l'album.
		if (serie.nom == txtSerie.value) {
			auteur = auteurs.get(album.idAuteur);

			miniTitre = album.titre;
			miniTitre = miniTitre.replace(/'|!|\?|\.|"|:|\$/g, "");
			let miniimg = "albumsMini/" + txtSerie.value + "-" + album.numero + "-" + miniTitre + ".jpg" ;
			miniimg = miniimg.replace(/'|!|\?|"|:|\$/g, "");
			console.log(miniimg);
			
			deathrow += '<button id="'+ txtId.value +'" oncClick="()"><img src="'+ miniimg +'"/></button>';
			
			document.getElementById('death').innerHTML = deathrow;

		}
	})
};
	

	
	// console.log("Liste des albums par série");
	// for(var [idSerie, serie] of series.entries()) {
	//     // Recherche des albums de la série
	//     for (var [titre, album] of albums.entries()) {
	//         if (album.idSerie == idSerie) {
	//             console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
	//         }
	//     }
	    
	// }
	

	
	// console.log("Liste des albums par auteur");
	// for(var [idAuteur, auteur] of auteurs.entries()) {
	//     // Recherche des albums de l'auteur
	//     for (var [idAlbum, album] of albums.entries()) {
	//         if (album.idAuteur == idAuteur) {
	//             console.log(auteur.nom+", Album N°"+album.numero+" "+album.titre+", Série:"+series.get(album.idSerie).nom);
	//         }
	//     }
	    
	// }
	
}

function Ajouter() {
	if (txtTitre.value != "") {
		let miniimg = "albumsMini/" + txtSerie.value + "-" + txtNumero.value + "-" + txtTitre.value + ".jpg" ;
		miniimg = miniimg.replace(/'|!|\?|"|:|\$/g, "");
		console.log(miniimg);

		let letitre = txtTitre.value;
		let laserie = txtSerie.value;
		let leprix = txtPrix.value;	

		article =  laserie + " - " + letitre + " - " + leprix + "€";

		listeAlbumimg.push(miniimg);
		listePrix.push(txtPrix.value);
		listeAlbum.push(article);

		console.log(listeAlbumimg);

		Panier()
	}
}


function Supprimer(letitre) {
	let index = listeAlbum.indexOf(letitre);	
	if (index == -1) {
		return;
}
listeAlbum.splice(index, 1);
listePrix.splice(index, 1);
listeAlbumimg.splice(index, 1);

Panier();
}


function Panier() {	
	let laliste = document.getElementById('liste');

	if (laliste == '') {
		laliste.innerHTML = '';
	} 
	else {	
		let article = ""
		for (let i = 0; i < listeAlbum.length; i++) {
			console.log(listeAlbum[i]);
			article += '<div class="div1"><img style="width: 40%" src="'+ listeAlbumimg[i] +'"/></div>' + '<div class="div2">'  + listeAlbum[i] + " " + '</div>' + '<div class="div3"><button class="btn" id="retirer'+i+'\" onclick="Supprimer(\'' + listeAlbum[i]  + '\')"' + i + '">Retirer</button></div><br>';
		}
		document.getElementById('liste').innerHTML = article;
		Ftotal()
	}
}


function Ftotal() {
	let total = 0;
	let letotal = document.getElementById('prixTotal');
	for (let j = 0; j < listePrix.length; j++) {
		chiffre1 = parseFloat(total);
		chiffre2 = parseFloat(listePrix[j]);
		total = chiffre1 + chiffre2  ;
	}
	lavaleur = parseFloat(total)
	letotal.innerHTML = "" + total.toFixed(2) + "€";
}


function valider() {
	let laliste = document.getElementById('liste');
	let letotal = document.getElementById('prixTotal');
	if (listeAlbum != "") {
		letotal.innerHTML = "";
		laliste.innerHTML = "";
		listeAlbum.splice(0, listeAlbum.length);
		listePrix.splice(0, listePrix.length);
		listeAlbumimg.splice(0, listeAlbumimg.length);
		alert("Merci pour vos achats")
	}
}


// function search(){
// 	console.log(album.titre);
// 		var a = document.getElementById("search").value;
// 		if(a != "" && a == album.titre) {

// 	// Lecture d'un album
// 	var album = albums.get(a);
// 	var serie = series.get(album.idSerie);
// 	var auteur = auteurs.get(album.idAuteur);
// 	console.log(album.titre+" "+serie.nom+" "+auteur.nom);

// 	let Gerard = document.getElementById('toto').value;
// 	let uneliste = document.createElement('ul');
// 	uneliste.innerText = Gerard;
// 	document.getElementById('toto').appendChild(uneliste);
// 	console.log(Gerard);

// 	document.getElementById("search").value = "";
// 		} else {
		
// 		}

// }

// const recherche = document.getElementById('btnsearch');
// 	recherche.addEventListener("click", search(), false);


// function random() {
// 	for (const [key, iterator] of albums) {
// 		console.log(iterator.titre);
		
// 	}
// }
// random()