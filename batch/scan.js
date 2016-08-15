
var glob = require('glob');
var debug = require('debug')('gallery');
var exif = require('exif');
//var PATTERN = "/images/**/*.jpg";
var REFRESH = 30*60;

exports.REFRESH = REFRESH;

exports.scan = function(pattern, callback){
    debug("pattern: "+pattern);
    
    var status="OK";

    glob(pattern, {matchBase:true, nocase:true}, function (er, files) {
        if (er) {
            debug("error in search: "+er);
            status = "KO";
        }

        debug("files: "+files);
        var ExifImage = exif.ExifImage;


        files.forEach(function(element) {
            
            try {
                new ExifImage({ image : element }, function (error, exifData) {
                    if (error)
                        console.log('Error: '+error.message);
                    else
                        console.log(exifData); // Do something with your data!
                });
            } catch (error) {
                debug('Error: ' + error.message);
            }
        }, this);
    


    })
    //setTimeout (scan(dir, callback), REFRESH);
    callback(status);
};
 

