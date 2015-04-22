/*
 * 画像処理プログラムを書いてみよう！
 *
 * src : 画像の入力データ
 * dst : 出力データ
 * width : 画像の横幅（ピクセル）
 * height : 画像の縦幅（ピクセル）
 * callback : 気にするな
 *
 * ---- srcの例 ----
 * var rgb = src.get(y, x); // ある座標のRGB値を取得
 * var R = rgb[0], G = rgb[1], B = rgb[2];
 *
 * ---- dstの例 ----
 * var rgb = [255, 0, 128]; // 色の定義
 * dst.set(y, x, rgb);      // ある座標の色をセット
 */
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(i, j);
            dst.set(i, width - 1 - j, rgb);
        }
    }

    callback();
}

// 上下反転
if (false)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(i, j);
            dst.set(height - 1 - i, j, rgb);
        }
    }

    callback();
}

// ネガ反転
if (false)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(i, j);
            var newrgb = [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
            dst.set(i, width - 1 - j, newrgb);
        }
    }

    callback();
}

// グレースケール変換
if (false)
process = function(src, dst, width, height, callback) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var rgb = src.get(i, j);
            var gray = (rgb[0] + rgb[1] + rgb[2]) / 3;
            dst.set(i, width - 1 - j, [gray, gray, gray]);
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
                    var rgb = src.get(i + y, j + x);
                    c[0] += rgb[0];
                    c[1] += rgb[1];
                    c[2] += rgb[2];
                }
            }
            c[0] /= ss;
            c[1] /= ss;
            c[2] /= ss;
            dst.set(i, j, c);
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
                        dst.set(y, x, src.get(y2, x2));
                    }
                }
            }
        }
    }

    callback();
}


