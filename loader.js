var loadImage = function(filename, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(filename);
    reader.onload = callback;
}
