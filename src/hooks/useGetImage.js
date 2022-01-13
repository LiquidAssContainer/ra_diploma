import { useEffect, useState } from 'react';

export const useGetImage = (images, placeholder) => {
  const [image, setImage] = useState(placeholder);

  useEffect(async () => {
    if (!images) {
      return;
    }
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images?.[0]);
      if (response.ok) {
        setImage(images[i]);
        break;
      }
    }
  }, [images]);

  return image;
};
