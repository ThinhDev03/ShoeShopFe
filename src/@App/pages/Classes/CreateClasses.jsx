import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseFormClasses from './components/BaseFormClasses';
import yupClasses from './utils/yupClasses';
import { gradeList, headTeacher } from './utils';
import BasicPage from '@App/components/customs/BasicPage';
import classesService from '@App/services/classes.service';
import { useSetNotifyState } from '@App/redux/slices/toastMessage.slice';

export default function CreateClasses() {
   const { setToastInformation } = useSetNotifyState();

   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(yupClasses),
      defaultValues: yupClasses.getDefault()
   });

   const onSubmit = async (data) => {
      const className = data.grade + data.className;

      try {
         await classesService.create({ ...data, className });
         setToastInformation({ message: 'Thêm lớp thành công' });
      } catch (error) {
         setToastInformation({ message: response?.data?.message || 'Thêm lớp không thành công', status: 'error' });
      }
   };
   const props = {
      gradeList,
      headTeacher,
      form,
      onSubmit
   };
   const breadcrumbs = [
      {
         name: 'Trang chủ',
         link: '/'
      },
      {
         name: 'Lớp học',
         link: '/classes'
      }
   ];
   return (
      <BasicPage currentPage='Thêm lớp học' breadcrumbs={breadcrumbs}>
         <BaseFormClasses {...props} />
      </BasicPage>
   );
}
