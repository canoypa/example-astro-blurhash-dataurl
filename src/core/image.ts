import { readFile } from "node:fs/promises";
import type { ImageMetadata } from "astro";
import { isRemoteImage } from "astro/assets/utils";

export async function getImageBuffer(imageMetadata: ImageMetadata | string) {
	// リモート画像の場合は普通にfetch
	if (isRemoteImage(imageMetadata)) {
		return await fetch(imageMetadata).then((res) => res.arrayBuffer());
	}

	// filenameだけ取り出す
	const filename = imageMetadata.src
		.replace(/^\/@fs/, "/")
		.replace(/\?.+$/, "");

	const imageFsPath = import.meta.env.PROD
		? ["./dist", filename].join("") // ビルド時は
		: filename; // ローカル開発時は

	return await readFile(imageFsPath);
}
