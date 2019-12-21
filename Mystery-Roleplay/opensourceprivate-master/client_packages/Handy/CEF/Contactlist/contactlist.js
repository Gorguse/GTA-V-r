$(".btn").on('click', function(){
	$(".contact ,.overlay").removeClass("hidden");
});

var innerHTMLString = "";

function editContact(name) {
	mp.trigger("client:Handy:getSingleContact", name);
}

function callContact(name) {
	location.href = "../Phonecalling/phonecalling.html";
	mp.trigger("client:Handy:callContact", name);
}

function addEmergencyContacts() {
	innerHTMLString += "<button type='button' class='btn btn-primary btn-sm btn-block text-left' onclick='callContact(`911`)'><i class='fa fa-fw fa-walkie-talkie'></i> LSPD</button>";
	innerHTMLString += "<button type='button' class='btn btn-danger btn-sm btn-block text-left' onclick='callContact(`912`)'><i class='fa fa-fw fa-stethoscope'></i> Medic</button>";
	innerHTMLString += "<button type='button' class='btn btn-warning btn-sm btn-block text-left' onclick='callContact(`913`)'><i class='fa fa-fw fa-car-mechanic'></i> ACLS</button>";
	innerHTMLString += "<hr>";
	document.getElementById('wrapper-contacts').innerHTML = innerHTMLString;
}

function addContactDiv(contactName) {
	if(contactName.length > 21) {
		contactname = contactName.substring(0,21);
	}
	innerHTMLString += `<button type='button' class='btn btn-light btn-sm btn-block text-left' onclick='editContact("` + contactName + `")'><i class='fa fa-fw fa-user'></i> ` + contactName + `</button>`;
	document.getElementById('wrapper-contacts').innerHTML = innerHTMLString;
}