// 上下反転
if (false)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(j, i);
            dst.set(j, height - 1 - i, rgb);
        }
    }

    callback();
}

// ネガ反転
if (false)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(j, i);
            var newrgb = [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
            dst.set(j, i, newrgb);
        }
    }

    callback();
}

// グレースケール変換
if (true)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(j, i);
            var gray = (rgb[0] + rgb[1] + rgb[2]) / 3;
            dst.set(j, i, [gray, gray, gray]);
        }
    }

    callback();
}

// 簡易ぼかし
if (false)
process = function(src, dst, width, height, callback) {
    var s = 2; // ぼかしの半径
    var ss = (1 + 2 * s) * (1 + 2 * s);
    
    for (var i = s; i < height - s; i++) {
        for (var j = s; j < width - s; j++) {
            var c = [0, 0, 0];
            for (var x = -s; x <= s; x++) {
                for(var y = -s; y <= s; y++) {
                    var rgb = src.get(j + x, i + y);
                    c[0] += rgb[0];
                    c[1] += rgb[1];
                    c[2] += rgb[2];
                }
            }
            c[0] /= ss;
            c[1] /= ss;
            c[2] /= ss;
            dst.set(j, i, c);
        }
    }

    callback();
}

// 魚眼効果
// translated from http://popscan.blogspot.jp/2012/04/fisheye-lens-equation-simple-fisheye.html
if (true)
process = function(src, dst, width, height, callback) {
    for (var y = 0; y < height; y++) {
        var ny = ((2 * y) / height) - 1;
        var ny2 = ny * ny;

        for (var x = 0; x < width; x++) {
            var nx = ((2 * x) / width) - 1;
            var nx2 = nx * nx;
            var r = Math.sqrt(nx2 + ny2);
            if (0.0 <= r && r <= 1.0) {
                var nr = Math.sqrt(1.0 - r*r);
                nr = (r + (1.0 - nr)) / 2.0;
                if (nr <= 1.0) {
                    var theta = Math.atan2(ny, nx);
                    var nxn = nr * Math.cos(theta);
                    var nyn = nr * Math.sin(theta);
                    var x2 = Math.floor(((nxn + 1) * width) / 2.0);
                    var y2 = Math.floor(((nyn + 1) * height) / 2.0);
                    if (x2 >= 0 && x2 < width && y2 >= 0 && y2 < height) {
                        dst.set(x, y, src.get(x2, y2));
                    }
                }
            }
        }
    }

    callback();
}


