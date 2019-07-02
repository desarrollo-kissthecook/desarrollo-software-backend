async function asyncForEach(array, callback) {
  const promises = [];
  for (let index = 0; index < array.length; index += 1) {
    promises.push(callback(array[index], index, array));
  }
  await Promise.all(promises);
}
function choice(arr) {
  let rand = Math.random();
  rand *= arr.length;
  rand = Math.floor(rand);
  const res = arr[rand];
  return res;
}

module.exports = {
  asyncForEach,
  choice,
};
