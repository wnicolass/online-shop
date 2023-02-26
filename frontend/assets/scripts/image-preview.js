const imagePicker = document.getElementById('image');
const imagePreviewElement = document.querySelector('#image-upload-control img');

function updateImagePreview() {
  const { files } = imagePicker;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  const [pickedFile] = files;
  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = 'block';
}

imagePicker.addEventListener('change', updateImagePreview);
