'use client';

import { ChangeEvent, useState } from 'react';
import { useStorageUpload, useStorage } from '@thirdweb-dev/react';
import { Edit } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Loader } from '../ui/loader';
import { Textarea } from '../ui/textarea';
import { User } from '@/lib/localDB';
import { useUser } from '@/context/UserContext';

function ProfileSetUp({ user }: { user: User }) {
  const { refetchUser } = useUser();
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [fileLoading, setFileLoading] = useState<boolean>(false);
  const storage = useStorage();
  const { mutateAsync: upload } = useStorageUpload({
    uploadWithoutDirectory: true,
    uploadWithGatewayUrl: true,
  });

  async function uploadFile(event: ChangeEvent<HTMLInputElement>) {
    setFileLoading(true);
    try {
      const filesToUpload = [event.target.files];
      if (filesToUpload[0]) {
        const uris = await upload({ data: filesToUpload });
        if (storage) {
          const data = await storage.downloadJSON(uris[0]);
          const ipfsUrl = data[0];
          setProfileUrl(ipfsUrl);
        }
      }
    } finally {
      setFileLoading(false);
    }
  }

  function onSubmit() {
    user.setName(name);
    user.setDescription(about);
    user.setProfileUrl(profileUrl);
    refetchUser();
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4 text-black">
        {!fileLoading && (
          <div className="w-full">
            <input
              id="fileUpload"
              required
              name="fileUpload"
              type="file"
              className="sr-only"
              accept=".png,.jpeg,.jpg,.gif,.tif,.tiff,.raw,.svg,.webp"
              onChange={uploadFile}
            />
            <label
              htmlFor="fileUpload"
              className="focus-within:ring- focus-within:ring-offset-20 relative mx-auto block w-16 cursor-pointer rounded-md font-semibold text-white focus-within:outline-none"
            >
              <Avatar className="mx-auto h-16 w-16 text-black hover:opacity-50">
                {!profileUrl && (
                  <Edit className="absolute left-[25px] top-[25px] h-3 w-3 text-black" />
                )}
                <AvatarImage
                  alt="Doodles Project Gray"
                  src={profileUrl ? profileUrl : '/placeholder.svg'}
                  className="cover"
                />
              </Avatar>
            </label>
          </div>
        )}

        {fileLoading && <Loader />}

        <div className="flex flex-col gap-2 text-black">
          <div>Name</div>
          <Input onBlur={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <div>About yourself</div>
          <Textarea onBlur={(e) => setAbout(e.target.value)} />
        </div>
        {/* <div className="flex flex-col gap-2 text-black">
          <div>Warpcast (Optional)</div>
          <Input onBlur={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <div>Telegram Username (Optional)</div>
          <Input onBlur={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2 text-black">
          <div>Discord Username (Optional)</div>
          <Input onBlur={(e) => setName(e.target.value)} />
        </div> */}
      </div>
      {profileUrl && name && (
        <Button className="mx-auto mt-4 px-2" variant={'secondary'} onClick={() => onSubmit()}>
          {' '}
          Lets go!
        </Button>
      )}
    </>
  );
}

export default ProfileSetUp;
