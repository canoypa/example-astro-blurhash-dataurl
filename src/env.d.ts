// vite-plugin-arraybuffer の型定義
declare module "*?arraybuffer" {
	const content: ArrayBuffer;
	export default content;
}
