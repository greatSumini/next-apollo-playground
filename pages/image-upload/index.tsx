import { useState } from 'react';
import Head from 'next/head';
import { gql, useMutation } from '@apollo/client';

const IMAGES_UPLOAD_MUTATION = gql`
  mutation($files: [Upload!]!) {
    uploadMultipleImages(uploadImageInput: { files: $files }) {
      status
      reason
      value {
        Location
        ETag
        Bucket
        Key
      }
    }
  }
`;

export default function ImageUploadPage() {
  const [result, setResult] = useState<{
    requested: number;
    succeed: number;
  }>(null);

  const [mutate] = useMutation(IMAGES_UPLOAD_MUTATION);

  async function handleChange({ target: { validity, files } }) {
    if (!validity.valid) {
      return;
    }

    try {
      setResult(null);

      const {
        data: { uploadMultipleImages },
      } = await mutate({ variables: { files } });

      setResult({
        requested: uploadMultipleImages.length,
        succeed: uploadMultipleImages.filter(
          (uploadResult) => uploadResult.status === 'uploaded'
        ).length,
      });
    } catch (error) {
      setResult({
        requested: files.length,
        succeed: 0,
      });
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
        {result === null && <p>Request not made or Response pending</p>}
        {result !== null && (
          <p>
            upload request {result.succeed > 0 ? 'succeed 🎉' : 'failed 😢'} (
            {result.succeed}/{result.requested})
          </p>
        )}
      </main>
    </div>
  );
}
