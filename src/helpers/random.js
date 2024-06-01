export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const getRandomLetter = () => String.fromCharCode( getRandomInteger(65, 91) );

export const getRandomChars = (len) =>  [...Array(len)].map( (i,index) => getRandomInteger(0,20)%2==0 ? getRandomLetter() : getRandomInteger(48,58)).join('');
