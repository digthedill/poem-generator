let marxText = 'Freeman and slave, patrician and plebeian, lord and serf, guild-master and journeyman, in a word, oppressor and oppressed, stood in constant opposition to one another, carried on an uninterrupted, now hidden, now open fight, a fight that each time ended, either in a revolutionary reconstitution of society at large, or in the common ruin of the contending classes.'

let aliQuote = `Float like a butterfly, sting like a bee. Don't count the days, make the days count. Service to others is the rent you pay for your room here on earth.`

let robinSong = `Somebody said you got a new friend Does she love you better than I can? There's a big black sky over my town I know where you're at, I bet she's around`

const parseText = (text) => {
    let rawWords = text.replace(/[.,\/#!$%\^&\*;:{}=\-?_`~()]/g,"");
    // console.log(rawWords)
    let resultArr = rawWords.split(' ')
    return resultArr
}
// console.log(parseText(robinSong))

const wordCorp = document.getElementById('inputBox')

const generateWordPair = (text) => {
  let arr = parseText(text);
  let pairObj = {};
  arr.forEach((item, index) => {
      if(!pairObj[item]) {
      pairObj[item] = []
      }
      if (arr[index + 1]) {
      pairObj[item].push(arr[index + 1]);
      }
  })
    return pairObj
}

let wordPair = generateWordPair(marxText);
// console.log('markovChain:', wordPair)
const writeLine = (markovChain, lengthOfWords) => {
  let tempArray = [];
  let string = '';
  const words = Object.keys(markovChain)

  for(let i = 0; i < lengthOfWords/2; i++){

    let word = words[Math.floor(Math.random() * words.length)]
    t = Math.floor( Math.random()* markovChain[word].length);
    tempArray.push(word, markovChain[word][t])
      // console.log(resultStr)
    }
    if (tempArray.length === lengthOfWords) {
      string = tempArray.join(' ')
      return string
      
    } else {
      tempArray.length = lengthOfWords
      string = tempArray.join(' ')
      return string
    }
  }

let poemLine = writeLine(wordPair, 5);

/*
Set up the function to accept two parameters: a word corpus and a number of lines. Inside the function, use the functions we've written to generate a poem with the number of lines specified.
*/
const generatePoem = (wordCorpus, numOfLines, numOfWords = 5) => {
  let markovChain = generateWordPair(wordCorpus);
  // console.log(markovChain)
  let lineOfPoem = ''
  let poemRows = []
  let finalBlock = ''
  for(let i = 0; i < numOfLines; i++){
    lineOfPoem = writeLine(markovChain, numOfWords)
    poemRows.push(lineOfPoem)
  }
  for(let i = 0; i < poemRows.length; i++){
    let row = poemRows[i];
    finalBlock += `${row}
    `
    }
  // console.log(poemRows)
  return finalBlock
}

let finalPoem = generatePoem(wordCorp, 6)
document.getElementById('poemResult').innerText = finalPoem;

console.log(finalPoem)