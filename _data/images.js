const fs = require('fs').promises,
  path = require('path'),
  exif = require('fast-exif');

// https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
function ConvertDMSToDD(direction, degrees, minutes, seconds) {
  var dd = degrees + minutes / 60 + seconds / (60 * 60);

  if (direction == 'S' || direction == 'W') {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

function processLocationInfo(file, tags) {
  if (!tags.gps) {
    console.log(`${file} has no gps info available`);
    return {
      latitude: undefined,
      longitude: undefined
    };
  }

  const gps = {
    latitude: ConvertDMSToDD(tags.gps.GPSLatitudeRef, ...tags.gps.GPSLatitude),
    longitude: ConvertDMSToDD(tags.gps.GPSLongitudeRef, ...tags.gps.GPSLongitude)
  };

  return gps;
}

module.exports = async function getImages() {
  let files = await fs.readdir(path.resolve('assets/images'));

  files = files.map(async (file) => {
    const tags = await exif.read(path.resolve(`assets/images/${file}`));
    return {
      file,
      gps: processLocationInfo(file, tags)
    };
  });

  const finalData = await Promise.all(files);

  return finalData;
};
