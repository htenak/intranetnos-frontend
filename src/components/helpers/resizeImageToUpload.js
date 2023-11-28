// redimensiona imagen (solo alto maximo)
export const resizeImageToUpload = async (file, maxHeight) => {
  const image = new Image();
  image.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      let newWidth, newHeight;

      if (height > maxHeight) {
        newHeight = maxHeight;
        newWidth = (maxHeight / height) * width;
      } else {
        newHeight = height;
        newWidth = width;
      }

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name));
      }, file.type);
    };
  });
};
