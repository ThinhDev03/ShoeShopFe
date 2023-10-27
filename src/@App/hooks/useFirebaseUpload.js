import React, { useState } from 'react';
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '@App/configs/firebase';

function useFirebaseUpload() {
   const [loading, setLoading] = useState(false);

   const uploadFirebaseImage = async (data, setSrcImage) => {
      if (data) {
         setLoading(true);
         try {
            if (data.target.files.length >= 2) {
               const images = [...data.target.files];

               const uploadPromises = images.map(async (fileImage) => {
                  const storageRef = ref(storage, fileImage.name);

                  const snapshot = await uploadBytes(storageRef, fileImage);

                  return getDownloadURL(snapshot.ref);
               });

               const uploadedUrls = await Promise.all(uploadPromises);

               setLoading(false);

               return uploadedUrls;
            }

            if (data.target.files.length === 1) {
               const storageRef = ref(storage, data.target.files[0].name);

               const snapshot = await uploadBytes(storageRef, data.target.files[0]);

               const uploadedUrl = await getDownloadURL(snapshot.ref);

               if (setSrcImage) {
                  setSrcImage(uploadedUrl);
               }

               setLoading(false);

               return uploadedUrl;
            }
         } catch (error) {
            console.log('upload image to firebase failed: ' + error.message);

            setLoading(false);
         }
      } else {
         console.log('Vui lòng thêm dữ liệu');
      }
   };

   const deleteFirebaseImage = async (srcImage) => {
      if (srcImage) {
         setLoading(true);
         try {
            if (Array.isArray(srcImage) && srcImage.length > 0) {
               srcImage.map(async (image) => {
                  const desertRef = ref(storage, srcImage);

                  await deleteObject(desertRef);

                  setLoading(false);

                  return true;
               });

               return true;
            }

            const desertRef = ref(storage, srcImage);

            await deleteObject(desertRef);

            setLoading(false);

            return true;
         } catch (error) {
            console.log(error);
            setLoading(false);
         }
      }
   };

   return { loading, setLoading, uploadFirebaseImage, deleteFirebaseImage };
}

export default useFirebaseUpload;
