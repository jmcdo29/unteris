let imageInsert = "INSERT INTO image (type, original_url) VALUES";

const images = [
	"pomdra.jpg",
	"venlustel.png",
	"felvcor.jpg",
	"latubor.jpg",
	"everfather.png",
	"amashia.png",
	"fortuna.png",
	"jarekos.png",
	"kor_amare.png",
	"kurio.png",
	"lacuna.png",
	"lux.png",
	"militaris.png",
	"mors.png",
	"ordin.png",
	"proecerta.png",
	"rz.png",
	"thirio.png",
	"tsumi.png",
	"umbra.png",
	"viridi.png",
	"queen_titania.png",
	"king_oberon.png",
	"tadhg.png",
	"aodhan.png",
	"caoimhe.png",
	"queen_eira.png",
	"branok.png",
	"ciaradh.png",
	"lady_daeris.png",
	"klinge_seele.png",
	"verfell.png",
	"meister_spinne.png",
	"krypta_vatcher.png",
];

for (const image of images) {
	imageInsert += `('deity_avatar', './images/${image}'),`;
}

imageInsert = `${imageInsert.substring(0, imageInsert.length - 1)};`;

console.log(imageInsert);
