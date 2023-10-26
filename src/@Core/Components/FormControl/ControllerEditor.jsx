import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@App/configs/firebase';
import { Box, FormHelperText } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ControllerEditor({ name, setValue, control, ...props }) {
   function uploadAdapter(loader) {
      return {
         upload: () => {
            return new Promise(async (resolve, reject) => {
               const file = await loader.file;

               const storageRef = ref(storage, name + '/' + file.name);

               const snapshot = await uploadBytes(storageRef, file);

               const src = await getDownloadURL(snapshot.ref);

               resolve({ default: src });
            });
         }
      };
   }

   function uploadPlugin(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
         return uploadAdapter(loader);
      };
   }

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Box
                     component={CKEditor}
                     data={useWatch({ control, name })}
                     editor={ClassicEditor}
                     config={{
                        extraPlugins: [uploadPlugin]
                     }}
                     onChange={(_, editor) => {
                        const data = editor.getData();
                        setValue(name, data);
                     }}
                     {...props}
                  />
                  {error?.message && (
                     <FormHelperText variant='standard' sx={{ color: '#d32f2f' }}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         name={name}
         control={control}
      />
   );
}

export default ControllerEditor;
