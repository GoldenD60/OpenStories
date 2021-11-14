var stories;
var storiesList;

window.onload = () => {
	//if (localStorage.getItem("stories") === "") {
		localStorage.setItem("stories", `[
			{
				"thumbnail": "https://placekitten.com/g/98/98",
				"title": "Example Story",
				"author": "David Skillman",
				"pages": [
					{
						"photo": "https://placekitten.com/g/99/88",
						"caption": "This kwitty is very cute :3"
					},
					{
						"photo": "https://placekitten.com/g/99/99",
						"caption": "So is this one ❤"
					},
					{
						"photo": "https://placekitten.com/g/99/98",
						"caption": "Oooh"
					}
				]
			}
		]`);
	//}

	stories = JSON.parse(localStorage.getItem("stories"));

	storiesList = document.getElementById('stories--list');
	storiesList.innerHTML = '';
	for (var i = 0; i < stories.length; i++) {
		var story = document.createElement('ons-list-item');
		storiesList.appendChild(story);
		story.setAttribute('tappable');
		var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		story.innerHTML = `
<div class="left">
	<img class="list-item__thumbnail story__thumbnail" src="`+stories[i]["thumbnail"]+`">
</div>
<div class="center">
	<span class="list-item__title" style="font-size: 20pt; margin-bottom: 10px;"><b>`+stories[i]["title"]+`</b></span>
	<span class="list-item__subtitle" style="font-size: 20pt;">`+stories[i]["author"]+`</span>
	<span class="list-item__subtitle" style="font-size: 20pt;"><b>`+stories[i]["pages"].length + " page(s) - "+ monthsShort[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear() +`</b></span>
</div>
<div class="right">
	<ons-toolbar-button tappable>
		<ons-icon icon="ion-ios-information-circle"></ons-icon>
	</ons-toolbar-button>
</div>
		`;
		story.childNodes[1].setAttribute('onclick', 'story(stories['+i+'])');
		story.childNodes[3].setAttribute('onclick', 'story(stories['+i+'])');
		story.childNodes[5].childNodes[1].setAttribute('onclick', 'edit('+i+')');
	}
};

function story(story) {
	var currentPage = 0;
	document.querySelector('#storiesNav').pushPage('story.html', {data: {pages: story["pages"]}});
	document.addEventListener('init', function(e) {
		var page = e.target;

		if (page.id === 'story') {
			page.querySelector('ons-toolbar .center').innerHTML = "Page " + (currentPage + 1);

			var image = page.querySelector('#story--img');
			image.setAttribute("src", page.data.pages[currentPage]["photo"]);

			var caption = page.querySelector('#story--caption');
			caption.textContent = page.data.pages[currentPage]["caption"];

			var back = page.querySelector('#story--arrow-left');
			var forward = page.querySelector('#story--arrow-right');

			if (currentPage > 0) {
				back.style.display = "";
			} else {
				back.style.display = "none";
			}

			if (currentPage === story["pages"].length - 1) {
				forward.style.display = "none";
			} else {
				forward.style.display = "";
			}

			back.addEventListener('click', ()=>{
				currentPage--;
				page.querySelector('ons-toolbar .center').innerHTML = "Page " + (currentPage + 1);
				image.setAttribute("src", page.data.pages[currentPage]["photo"]);
				caption.textContent = page.data.pages[currentPage]["caption"];
				if (currentPage > 0) {
					back.style.display = "";
				} else {
					back.style.display = "none";
				}

				if (currentPage === story["pages"].length - 1) {
					forward.style.display = "none";
				} else {
					forward.style.display = "";
				}
			});
			forward.addEventListener('click', ()=>{
				currentPage++;
				page.querySelector('ons-toolbar .center').innerHTML = "Page " + (currentPage + 1);
				image.setAttribute("src", page.data.pages[currentPage]["photo"]);
				caption.textContent = page.data.pages[currentPage]["caption"];
				if (currentPage > 0) {
					back.style.display = "";
				} else {
					back.style.display = "none";
				}

				if (currentPage === story["pages"].length - 1) {
					forward.style.display = "none";
				} else {
					forward.style.display = "";
				}
			});
		}
	});
}

function edit(index) {
	var story = stories[index];
	var dialog = document.getElementById('edit');

	if (dialog) {
		dialog.show();
	} else {
		ons.createElement('edit.html', { append: true })
		.then(function(dialog) {
			dialog.show();
			var pages = story["pages"];
			for (var i = 0; i < pages.length; i++) {
				var page = document.createElement('ons-list-item');
				var pageList = document.getElementById('pages--list');
				pageList.appendChild(page);
				page.innerHTML = `
<div class="left">
	<img class="list-item__thumbnail story__thumbnail" src="`+pages[i]["photo"]+`">
</div>
<div class="center">
	<span class="list-item__title" style="font-size: 17.5pt; height: 100%; text-overflow: ellipsis; max-width: 85vw; max-height: 85vh; word-wrap: break-word;"><b>`+pages[i]["caption"]+`</b></span>
</div>
<div class="right">
	<ons-toolbar-button tappable>
		<ons-icon icon="ion-ios-information-circle"></ons-icon>
	</ons-toolbar-button>
</div>
		`;
				page.childNodes[5].childNodes[1].setAttribute('onclick', 'editPage('+index+', '+i+')');
			}
		});
	}
}

function editPage(index, page) {
	var page = stories[index]["pages"][page];
	var dialog = document.getElementById('editPage');

	if (dialog) {
		dialog.show();
	} else {
		ons.createElement('editPage.html', { append: true })
		.then(function(dialog) {
			dialog.show();
		});
	}
}

function hideEditor() {
	document
		.getElementById('edit')
		.hide();
}

function hidePagesEditor() {
	document
		.getElementById('editPage')
		.hide();
}

function alert(text) {
	ons.notification.alert(text);
}