let selectedImages = [];
let imagePairs = [];

const imageList = [
  { class: 'img1', url: 'https://picsum.photos/id/237/200/300' },
  { class: 'img2', url: 'https://picsum.photos/seed/picsum/200/300' },
  { class: 'img3', url: 'https://picsum.photos/200/300?grayscale' },
  { class: 'img4', url: 'https://picsum.photos/200/300/' },
  { class: 'img5', url: 'https://picsum.photos/200/300.jpg' }
];

// Shuffle and duplicate one image
function shuffleImages() {
  const randomIndex = Math.floor(Math.random() * imageList.length);
  const duplicateImage = imageList[randomIndex];
  const shuffled = [...imageList];
  shuffled.push(duplicateImage); // Add duplicate

  // Fisher–Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function displayImages() {
  selectedImages = [];
  const imagesContainer = document.getElementById("images");
  imagesContainer.innerHTML = "";
  imagePairs = shuffleImages();

  imagePairs.forEach((imgData, index) => {
    const img = document.createElement("img");
    img.src = imgData.url;
    img.classList.add("image", imgData.class);
    img.dataset.class = imgData.class;

    img.addEventListener("click", () => {
      if (!img.classList.contains("selected")) {
        img.classList.add("selected");
        selectedImages.push(img.dataset.class);
      }

      if (selectedImages.length === 1) {
        document.getElementById("reset").style.display = 'inline';
      }

      if (selectedImages.length === 2) {
        document.getElementById("verify").style.display = 'inline';
      }
    });

    imagesContainer.appendChild(img);
  });
}

document.getElementById("reset").addEventListener("click", () => {
  selectedImages = [];
  document.getElementById("reset").style.display = "none";
  document.getElementById("verify").style.display = "none";
  document.getElementById("para").innerHTML = "";
  displayImages();
});

document.getElementById("verify").addEventListener("click", () => {
  const para = document.getElementById("para");
  if (selectedImages.length === 2 && selectedImages[0] === selectedImages[1]) {
    para.innerHTML = "You are a human. Congratulations!";
  } else {
    para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  document.getElementById("verify").style.display = "none";
});

window.onload = displayImages;
