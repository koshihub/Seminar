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
            dst.set(i, j, rgb);
        }
    }

    callback();
}
