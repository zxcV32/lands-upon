const fs = require('fs').promises,
  path = require('path'),
  exif = require('fast-exif'),
  got = require('got');

// https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
function ConvertDMSToDD(direction, degrees, minutes, seconds) {
  var dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

function processLocationInfo(file, tags) {
  if (!tags || !tags.gps || !tags.gps.GPSLatitudeRef) {
    console.log(`${file} has no gps info available`);
    return;
  }

  const gps = {
    latitude: ConvertDMSToDD(tags.gps.GPSLatitudeRef, ...tags.gps.GPSLatitude),
    longitude: ConvertDMSToDD(tags.gps.GPSLongitudeRef, ...tags.gps.GPSLongitude)
  };

  return gps;
}

async function getLocationName(gps) {
  const response = await got(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${gps.longitude},${gps.latitude}.json?access_token=pk.eyJ1IjoiYXJwaXRiYXRyYTEyMyIsImEiOiJja2Q2N3ViMGkwbzgzMnFuem55NG10OHNqIn0.zoeIkNpnI16a6Vz69A1UCA`
  ).json();

  return response.features[1].place_name;
}

module.exports = async function getImages() {
  let files = await fs.readdir(path.resolve('assets/images'));

  files = files.map(async (file) => {
    const tags = await exif.read(path.resolve(`assets/images/${file}`));
    const gps = processLocationInfo(file, tags);

    let name;
    if (gps) {
      name = await getLocationName(gps);
    }

    return {
      file,
      gps,
      name
    };
  });

  let finalData = await Promise.all(files);
  finalData = finalData.filter((item) => item.gps);

  return finalData;
};
