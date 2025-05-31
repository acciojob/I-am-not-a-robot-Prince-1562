//your code here
const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg"
];
const container = document.querySelector('.container');
const imageElements = container.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const message = document.getElementById('h');
const resultPara = document.getElementById('para');

let selectedImages = [];
let selectedIndices = [];
let duplicateIndex;
let duplicateImage;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function setupImages() {
  selectedImages = [];
  selectedIndices = [];

  const randomIndexToDuplicate = Math.floor(Math.random() * images.length);
  duplicateImage = images[randomIndexToDuplicate];

  const allImages = [...images];
  const insertIndex = Math.floor(Math.random() * allImages.length);
  allImages.splice(insertIndex, 0, duplicateImage);

  shuffleArray(allImages);

  imageElements.forEach((img, index) => {
    img.src = allImages[index];
    img.classList.remove('selected');
    img.onclick = () => handleImageClick(img, index, allImages[index]);
  });

  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  resultPara.textContent = '';
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
}

function handleImageClick(imgElement, index, src) {
  if (selectedIndices.length < 2 && !selectedIndices.includes(index)) {
    imgElement.classList.add('selected');
    selectedImages.push(src);
    selectedIndices.push(index);

    resetButton.style.display = 'inline-block';

    if (selectedImages.length === 2) {
      verifyButton.style.display = 'inline-block';
    }
  }
}

resetButton.addEventListener('click', setupImages);

verifyButton.addEventListener('click', () => {
  verifyButton.style.display = 'none';
  if (selectedImages[0] === selectedImages[1]) {
    resultPara.textContent = "You are a human. Congratulations!";
  } else {
    resultPara.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

setupImages();