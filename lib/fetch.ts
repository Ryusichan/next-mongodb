export default function fetcher(url: any) {
  return fetch(url).then((r) => r.json());
}
