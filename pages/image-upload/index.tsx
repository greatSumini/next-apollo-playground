import { useState } from 'react';
import Head from 'next/head';
import { gql, useMutation } from '@apollo/client';

const IMAGES_UPLOAD_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadMultipleImages(uploadImageInput: { files: $files })
  }
`;

export default function ImageUploadPage() {
  const [data, setData] = useState<string[]>(null);

  const [mutate] = useMutation(IMAGES_UPLOAD_MUTATION);

  async function handleChange({ target: { validity, files } }) {
    if (!validity.valid) {
      return;
    }

    try {
      setData(null);

      const {
        data: { uploadMultipleImages },
      } = await mutate({ variables: { files } });

      setData(uploadMultipleImages);
    } catch (error) {
      setData([...Array(files.length)].fill(null));
      console.log(error);
    }
  }

  return (
    <div>
      <Head>
        <title>ImageUpload - Nextjs Apollo Playground</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <h1>ImageUpload</h1>

        <h3>input</h3>
        <input
          type="file"
          required
          onChange={handleChange}
          multiple
          accept="image/*"
        />

        <h3>status</h3>
        {data === null && <p>Request not made or Response pending</p>}
        {data !== null && (
          <p>
            upload request{' '}
            {data.filter((v) => v).length > 0 ? 'succeed 🎉' : 'failed 😢'} (
            {data.filter((v) => v).length}/{data.length})
          </p>
        )}
        {data
          ?.filter((v) => v)
          .map((url) => (
            <img key={url} src={url + '?w=350&h=350&f=webp&q=60'} />
          ))}
      </main>
    </div>
  );
}
