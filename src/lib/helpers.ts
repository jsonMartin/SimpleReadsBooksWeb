export function wrapTextInParagraphTags(text) {
  return text
    .split('\n')
    .map((line) => `<p>${line}</p>`)
    .join('');
}

export function generateTestImage(randomSizeLimit = 400, fixedSizeLimit = 200) {
  const id = Math.random() * 100000000;

  return {
    id,
    name: 'Test image ' + id,
    imgurl: `https://picsum.photos/${Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit
      }/${Math.floor(Math.random() * randomSizeLimit) + fixedSizeLimit}?random=6`,
    attribution: 'picsum photos'
  };
}

