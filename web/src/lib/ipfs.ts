import { ThirdwebStorage } from '@thirdweb-dev/storage';
import axios from 'axios';
import sharp from 'sharp';

// First, instantiate the thirdweb IPFS storage
const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_AUTH_PRIVATE_KEY,
});

// Upload and return the manifest url
export async function uploadMetadata(defaultMetadata: any): Promise<string> {
  // the first metadata will always be the default metadata
  // Here we get the IPFS URI of where our metadata has been uploaded
  const uris = await storage.uploadBatch([defaultMetadata]);
  // This will log a URL like ipfs://QmWgbcjKWCXhaLzMz4gNBxQpAHktQK6MkLvBkKXbsoWEEy/0

  if (!uris.length) return '';
  const manifestUri = uris[0];

  // Here we get a URL with a gateway that we can look at in the browser
  return manifestUri.slice(0, manifestUri.lastIndexOf('/')); // remove the last "/" from the uri
}

export async function uploadFile(url: string) {
  const response = await axios({
    url: url,
    responseType: 'arraybuffer',
  });
  const convertedBuffer = await sharp(response.data)
    .jpeg({
      quality: 100, // Adjust quality between 1-100 (lower means more compression and less quality)
      progressive: true, // Use progressive (interlace) scan for JPEG (might be beneficial for web use)
    })
    .toBuffer();
  const arrayBuffer = convertedBuffer.buffer.slice(
    convertedBuffer.byteOffset,
    convertedBuffer.byteOffset + convertedBuffer.byteLength,
  );
  const file = new File([arrayBuffer], 'meet.png', { type: 'image/png' });
  // const file = new File([dataBlob], "signature.png", { type: "image/png" });
  const data = await file.arrayBuffer();
  // Here we get the IPFS URI of where our metadata has been uploaded, this will return an array of URIs
  const uri = await storage.upload(Buffer.from(data));
  // grab the first uri
  return uri;
}
