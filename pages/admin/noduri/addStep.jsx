import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  return (
    <div className='text-gray-700'>
      <h1>Upload Image to Cloudinary</h1>
      <ImageUpload />
    </div>
  );
}
