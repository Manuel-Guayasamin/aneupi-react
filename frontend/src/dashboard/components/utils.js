
export default function getImgConv(name) {
  return new URL(name, import.meta.url).href;
}