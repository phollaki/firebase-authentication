import { auth, storage } from "@/config/firebase";
import { useAuth } from "@/stores/authState";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Notifications, notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { Avatar } from "@mantine/core";
import useFirebaseAuthentication from '@/hooks/useFirebaseAuthentication'

const ChangeableProfilePicture = () => {
  const firebaseUser = useFirebaseAuthentication()
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const handleImageUpload = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();

    if (!selectedImage || !firebaseUser) {
      notifications.show({
        title: "Firebase notification",
        message: `No user found. 🤥`,
        color: "red",
      });
      return;
    }

    try {
      const storageRef = ref(storage, `images/${selectedImage.name}`);
      const url = await getDownloadURL(storageRef);
      const imageURL = url;

      await updateProfile(firebaseUser, { photoURL: imageURL });

      notifications.show({
        title: "Firebase notification",
        message: `Hey there, you made a successful image upload! 🥳 Your new profile picture ${firebaseUser?.photoURL}`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Firebase notification",
        message: `${error.message} 🤥`,
        color: "red",
      });
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files?.[0]);
  };


  const profilePicture = selectedImage
    ? URL.createObjectURL(selectedImage)
    : firebaseUser?.photoURL || "/avatar.jpeg";

  return (
    <form onSubmit={handleImageUpload}>
      <label
        htmlFor="theFileInput"
        className="flex flex-col items-center space-y-4 hover:opacity-80 hover:cursor-pointer"
      >
        <input
          type="file"
          id="theFileInput"
          className="hidden"
          onChange={handleImageChange}
          />
        <div className="border-8 border-white rounded-full overflow-hidden">
          <Avatar src={profilePicture} alt="it's me" size={100} />
        </div>
        {selectedImage && <button type="submit" className="text-sm text-gray-300">Upload image</button>}
      </label>
    </form>
  );
};

export default ChangeableProfilePicture;
