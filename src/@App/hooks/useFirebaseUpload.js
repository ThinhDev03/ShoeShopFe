import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '@App/configs/firebase';

function useFirebaseUpload() {
   const uploadFirebaseImage = async (data) => {
      if (data) {
         try {
            if (data.target.files.length >= 2) {
               const images = [...data.target.files];

               const uploadPromises = images.map(async (fileImage) => {
                  const storageRef = ref(storage, fileImage.name + Math.floor(Math.random() * 100000000000000));
                  const snapshot = await uploadBytes(storageRef, fileImage);
                  return getDownloadURL(snapshot.ref);
               });

               const uploadedUrls = await Promise.all(uploadPromises);
               console.log(uploadedUrls);

               return uploadedUrls;
            } else {
               const storageRef = ref(storage, data.target.files[0].name);

               const snapshot = await uploadBytes(storageRef, data.target.files[0]);

               const uploadedUrl = await getDownloadURL(snapshot.ref);
               console.log(uploadedUrl);

               return uploadedUrl;
            }
         } catch (error) {
            console.log('upload image to firebase failed: ' + error.message);
         }
      }
   };

   const deleteFirebaseImage = async (srcImage) => {
      if (srcImage) {
         try {
            if (Array.isArray(srcImage) && srcImage.length > 0) {
               srcImage.map(async (image) => {
                  const desertRef = ref(storage, srcImage);

                  await deleteObject(desertRef);
               });

               return true;
            }

            const desertRef = ref(storage, srcImage);

            await deleteObject(desertRef);

            return true;
         } catch (error) {
            console.log(error);
         }
      }
   };

   return { uploadFirebaseImage, deleteFirebaseImage };
}

export default useFirebaseUpload;
