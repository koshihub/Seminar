var process = function() { alert("no process defined"); };

var init = function(callback) {
    var ofd = document.getElementById("fi");
    ofd.addEventListener("change", function(e) {
        var item = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                callback(img);
            }
        };
        reader.readAsDataURL(item);
    });
}

init(function(img) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = img.width;
    var height = img.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0);

    var srcObj = context.getImageData(0, 0, width, height);
    context.putImageData(srcObj, 0, 0);
    var dataurl = canvas.toDataURL();
    document.getElementById("input").innerHTML = "Input: <br><img src='" + dataurl + "'>";
    document.getElementById("message").innerHTML = "Processing Image...";

    // set original functions
    var dst = new Array(width * height * 4);
    dst.set = function(j, i, rgb) {
        var idx = (j + i * width) * 4;
        this[idx] = rgb[0]; this[idx+1] = rgb[1]; this[idx+2] = rgb[2];
    };
    srcObj.data.get = function(j, i) {
        var idx = (j + i * width) * 4;
        return [this[idx], this[idx+1], this[idx+2]];
    };

    setTimeout(process.bind(null, srcObj.data, dst, width, height, function() {
        // set alpha values
        for (var i = 0; i < height; i++) {
            for (var j = 0; j < width; j++) {
                var idx = (j + i * width) * 4;
                dst[idx + 3] = srcObj.data[idx + 3];
            }
        }
        srcObj.data.set(dst);

        context.putImageData(srcObj, 0, 0);
        var dataurl = canvas.toDataURL();
        document.getElementById("output").innerHTML = "Output: <br><img src='" + dataurl + "'>";
        document.getElementById("message").innerHTML = "Finish!!";
    }), 0);
});
