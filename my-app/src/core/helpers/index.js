
const getRandomElementArr = (arr) => {
const randomIndex = Math.floor(Math.random() * arr.length);
return arr[randomIndex];
}



export { getRandomElementArr }