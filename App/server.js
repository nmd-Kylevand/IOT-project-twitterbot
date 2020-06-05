
let fs = require('fs'),

    path = require('path'),

    Twit = require('twit'),

    config = require(path.join(__dirname, 'config.js'));
    
  
let T = new Twit(config);
const images = require(path.join(__dirname, 'images.js'));
const image = random_from_array(images);



function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}


function random_image_uploader(){
  console.log('Afbeelding aan het zoeken...');
  let image_path = path.join(__dirname, '/images/' + image.file),
      b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  console.log('Afbeelding aan het uploaden...');

  T.post('media/upload', { media_data: b64content }, function (err, data) {
    if (err){
      console.log('ERROR:');
      console.log(err);
    }
    else{
      console.log('Afbeelding geupload!');
      console.log('Nu de afbeelding aan het tweeten...');

      T.post('statuses/update', { status: (image.source),
          media_ids: new Array(data.media_id_string)
        },
        function(err) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Afbeelding gepost!');
          }
        }
      );
    }
  });
}
fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    let images = [];
    files.forEach(function(f) {
      images.push(f);
    });

    setInterval(function(){
      random_image_uploader(images);
    }, 10000);
  }
});
