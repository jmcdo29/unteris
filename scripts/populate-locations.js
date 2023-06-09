let locationsInsert = 'INSERT INTO location (name) VALUES ';

let locations = ['Empyrean Sea', 'Caelaum Arboria', 'Feywild', 'Shadowfell'];

for (const loc of locations) {
  locationsInsert += `('${loc}'),`;
}
console.log(locationsInsert.substring(0, locationsInsert.length - 1) + ';');
