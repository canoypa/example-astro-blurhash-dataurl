import { decode, encode } from "blurhash";
import sharp from "sharp";

// 画像から blurhash を生成する
export async function imageToBlurhash(data: ArrayBuffer) {
	const { data: buffer, info } = await sharp(data)
		.resize(100, 100, { fit: "cover" }) // サイズが大きいと時間かかるので小さくする
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });

	const pixels = new Uint8ClampedArray(buffer);
	const blurhash = encode(pixels, info.width, info.height, 3, 3);

	return blurhash;
}

// blurhash から placeholder を生成する
export async function blurhashToDataUrl(blurhash: string) {
	const size = 8;

	const pixels = decode(blurhash, size, size);
	const image = await sharp(pixels, {
		raw: { channels: 4, width: size, height: size },
	})
		.webp()
		.toBuffer();

	const dataUrl = `data:image/webp;base64,${image.toString("base64")}`;

	return dataUrl;
}

// blurhash 介さずに placeholder を生成する
export async function imageToDataUrl(data: ArrayBuffer) {
	const buffer = await sharp(data)
		.resize(4, 4, { fit: "cover" })
		.ensureAlpha()
		.webp()
		.toBuffer();

	const dataUrl = `data:image/webp;base64,${buffer.toString("base64")}`;

	return dataUrl;
}
