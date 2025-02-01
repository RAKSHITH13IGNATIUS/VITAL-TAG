// Function to generate a random image from the assets folder
function getRandomImage() {
  const images = [
    'img/s1.png',
    'img/s2.png',
    'img/s3.png',
    'img/s4.png',
    'img/s5.png',
    'img/s6.png',
    // Add more image paths as needed
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Handle form submission on index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
  document.getElementById('sticker-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const bloodGroup = document.getElementById('blood-group').value;
    const insurance = document.getElementById('insurance').value;
    const guardian = document.getElementById('guardian').value;

    // Store data in localStorage to pass to the next page
    localStorage.setItem('stickerData', JSON.stringify({
      name,
      bloodGroup,
      insurance,
      guardian,
      image: getRandomImage(),
    }));

    // Redirect to the sticker page
    window.location.href = 'sticker.html';
  });
}

// On the sticker page, populate the data
if (window.location.pathname.endsWith('sticker.html')) {
  const stickerData = JSON.parse(localStorage.getItem('stickerData'));

  if (stickerData) {
    // Display the data
    document.getElementById('sticker-name').textContent = stickerData.name;
    document.getElementById('sticker-blood-group').textContent = stickerData.bloodGroup;
    document.getElementById('sticker-insurance').textContent = stickerData.insurance;
    document.getElementById('sticker-guardian').textContent = stickerData.guardian;
    document.getElementById('sticker-image').src = stickerData.image;

    // Add download functionality
    document.getElementById('download-button').addEventListener('click', function () {
      const stickerElement = document.getElementById('sticker');
      html2canvas(stickerElement).then(canvas => {
        const link = document.createElement('a');
        link.download = 'emergency-sticker.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    });
  } else {
    alert('No sticker data found. Please go back and generate a sticker.');
  }
}