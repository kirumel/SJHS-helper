export default function test() {
  const arr = [1, 2, 3];
  const newLength = arr.push(4, 5);

  console.log(arr); // 출력: [1, 2, 3, 4, 5]
  console.log(newLength); // 출력: 5
  return <div></div>;
}
