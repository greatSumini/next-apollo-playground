import { useState } from 'react';
import Head from 'next/head';
import { gql, useMutation } from '@apollo/client';

const IMAGES_UPLOAD_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadMultipleImages(uploadImageInput: { files: $files })
  }
`;

export default function ImageUploadPage() {
  const [isSucceed, setSucceed] = useState(null);

  const [mutate] = useMutation(IMAGES_UPLOAD_MUTATION);

  async function handleChange({ target: { validity, files } }) {
    if (!validity.valid) {
      return;
    }

    try {
      setSucceed(null);

      const {
        data: { uploadMultipleImages },
      } = await mutate({ variables: { files } });

      setSucceed(uploadMultipleImages);
    } catch (error) {
      setSucceed(false);
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
        {isSucceed === null && <p>Request not made or Response pending</p>}
        {isSucceed !== null && (
          <p>upload request {isSucceed ? 'succeed 🎉' : 'failed 😢'}</p>
        )}
      </main>
    </div>
  );
}
