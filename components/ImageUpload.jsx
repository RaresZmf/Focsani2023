import { useState } from 'react';
import axios from 'axios';
import supabase from '@/utils/supabase';

const ImageUpload = (id) => {
  const [selectedImage, setSelectedImage] = useState();
    const   [content, setcontent] = useState('')

  const handleImageUpload = async (event) => {
    const date = new FormData();
    date.append('file', selectedImage);
    date.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL,
      date
    );
    console.log(res.date);

    const { data, error } = await supabase
    .from('noduri')
    .select('pasi')

    let pasNou = {
        "nr": id,
        "desc": "this is a new description",
        "link": "newlinktocloudifyimage.ro"
      }

  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className='flex flex-col space-y-12 text-gray-700'>
      <input type="file" onChange={handleImageChange} />
      <textarea rows='6' onChange={} name="" placeholder='descriere instructiune'></textarea>
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default ImageUpload;
