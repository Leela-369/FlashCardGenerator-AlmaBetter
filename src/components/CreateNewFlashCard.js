import React, { useRef, useState} from "react";
import { useDispatch } from "react-redux";
import { addFlashcard } from "../features/flashCardSlice";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import {useFormik} from 'formik'
import schema from '../validation/schema'
import AutosizeTextarea from "react-textarea-autosize"
import { motion, AnimatePresence } from 'framer-motion'

export const CreateNewFlashCard = ({flashcard = {}}) => {

  const dispatch = useDispatch();
  
  const initialMainGroup =
    flashcard && flashcard.mainGroup
      ? flashcard.mainGroup
      : {
          mainGroupName: "",
         mainGroupImage: "",
         mainGroupDescription: "",
        };
  const initialTermGroup =
    flashcard && flashcard.termGroup
      ? flashcard.termGroup
      : [
          {
            termGroupName: "",
            termGroupDescription: "",
            termGroupImage: "",
          },
        ];

  const termNameInputRefs = useRef([]);
  const [isMainGroupImageUploaded, setIsMainGroupImageUploaded] = useState(false);
  const [isTermImageUploaded, setIsTermImageUploaded] = useState(Array(initialTermGroup.length).fill(false));
  



  const handleMainChange = (field, value) => {
    formik.setFieldValue(`mainGroup.${field}`, value);
  };
  

  const handleTermChange = (index, field, value) => {
    const updatedTermGroup = formik.values.termGroup.map((termGroup, i) => {
      if (i === index) {
        return { ...termGroup, [field]: value };
      }
      return termGroup;
    });
    formik.setFieldValue("termGroup", updatedTermGroup);
  };
  

  const handleTermImageChange = (index, imageFile) => {
    const termGroupImage = {
      name: imageFile.name,
      termImageURL: URL.createObjectURL(imageFile),
    };
    formik.setFieldValue(`termGroup[${index}].termGroupImage`, termGroupImage);
  
    const updatedIsTermImageUploaded = [...isTermImageUploaded];
    updatedIsTermImageUploaded[index] = true;
    setIsTermImageUploaded(updatedIsTermImageUploaded);
  };
  
  
  const handleMainImageChange = (event) => {
    const imageFile = event.target.files[0];
    const mainGroupImage = {
      name: imageFile.name,
      mainImageURL: URL.createObjectURL(imageFile),
    };
    formik.setFieldValue("mainGroup.mainGroupImage", mainGroupImage);
    setIsMainGroupImageUploaded(true);
  };
  
  
  
  const addTermField = () => {
    formik.setFieldValue("termGroup", [
      ...formik.values.termGroup,
      { termGroupName: "", termGroupDescription: "", termGroupImage: "" },
    ]);
  };
  

  const removeTermField = (index) => {
    if (index === 0) {
      return; 
    }
    const updatedTermGroup = formik.values.termGroup.filter((_, i) => i !== index);
    formik.setFieldValue("termGroup", updatedTermGroup);
  };
  

  const handleSubmit = (values, { resetForm }) => {
    const updatedFlashcard = {
      ...flashcard,
      mainGroup: values.mainGroup,
      termGroup: values.termGroup,
    };

    console.log("Main Group:", updatedFlashcard.mainGroup);
    console.log("Updated Flashcard:", updatedFlashcard);

    updatedFlashcard.termGroup.forEach((term, index) => {
      console.log(`Term ${index + 1}:`, term);
    });


    dispatch(addFlashcard(updatedFlashcard));

    resetForm();
    setIsMainGroupImageUploaded(false);
    setIsTermImageUploaded(Array(initialTermGroup.length).fill(false));
  };
  

 
  const setEditingIndexAndFocus = (index) => {
    termNameInputRefs.current[index]?.focus();
  };

  const formik = useFormik({
    initialValues: {
      mainGroup: initialMainGroup,
      termGroup: initialTermGroup,
    },
    validationSchema: schema,
    onSubmit: handleSubmit
  });
  


  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="mt-3 h-auto w-full ">
      <div className="bg-white p-4">
        <div className="flex">
          <div className="w-1/2 mr-4">
            <p className="text-[13px] font-bold mb-2">Group Name</p>
            <input
            id="mainGroupName"
            name="mainGroupName"
            type="text"
            className="px-3 py-2 border border-black h-9 w-full text-10px"
            onChange={(event) => handleMainChange('mainGroupName', event.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values?.mainGroup?.mainGroupName}
          />
         {formik.touched.mainGroup?.mainGroupName &&
            formik.errors.mainGroup?.mainGroupName && (
              <div className="text-red-600 text-[10px]" >{formik.errors.mainGroup.mainGroupName}</div>
            )}
          </div>
          <div className=" flex w-1/3 mt-4 items-center">
          {isMainGroupImageUploaded ? (
  <img src={formik.values.mainGroup.mainGroupImage.mainImageURL} alt="Main Group" className="w-28 h-14 " />
) : (
  <label className="flex items-center  p-1 border border-blue-300 text-blue-500 text-[13px] cursor-pointer">
    <span>Upload Image</span>
    <input
      hidden
      id="mainGroupImage"
      name="mainGroupImage"
      type="file"
      accept="image/*"
      onChange={(event) => handleMainImageChange(event)}
      onBlur={formik.handleBlur}
    />
  </label>
)}

          </div>
        </div>
        <div className="mt-2 w-3/4">
          <p className="font-bold text-[13px] mb-2">Description</p>
          <textarea
            id="mainGroupDescription"
            name="mainGroupDescription"
            className="px-3 py-2 border border-black h-20 w-full text-[13px]"
            onChange={(event) => handleMainChange('mainGroupDescription', event.target.value)}
            onBlur={formik.handleBlur}
            value={formik.values.mainGroup.mainGroupDescription}
          />
          {formik.touched.mainGroup?.description &&
            formik.errors.mainGroup?.description && (
              <div className="text-red-600 text-[10px]">{formik.errors.mainGroup.description}</div>
            )}
      </div>
        </div>

        <div className="mt-3 bg-white w-full px-3 py-3 ">
        <AnimatePresence>
        {formik.values.termGroup.map((termGroup, index) => (
            <motion.div key={index}
             className="flex flex-row w-full space-x-2 mb-5"
             initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
             >
              
              <div className="w-16 h-8 mt-4 flex items-center justify-center bg-blue-500 rounded-full text-white text-[14px] font-bold">
                {index + 1}
              </div>
              
              <div className="w-5/6">
              <label htmlFor={`termGroup[${index}].termGroupName`} className="text-[13px] font-bold " >Enter Term </label>
                <input
                  id={`termGroup[${index}].termGroupName`}
                  name={`termGroup[${index}].termGroupName`}
                  type="text"
                  onChange={(event) =>
                    handleTermChange(index, "termGroupName", event.target.value)
                  }
                  onBlur={formik.handleBlur}
                  className="px-3 py-2 border border-black h-9 w-full text-[13px] mt-1"
                  value={formik.values.termGroup[index].termGroupName}
                  ref={(ref) => (termNameInputRefs.current[index] = ref)}
                />
                {formik.touched.termGroup?.[index]?.termGroupName &&
                  formik.errors.termGroup?.[index]?.termGroupName && (
                    <div className="text-red-600 text-[10px] mt-1">{formik.errors.termGroup[index].termGroupName}</div>
                  )}   </div>
              <div className="w-5/6 ">
              <label htmlFor={`termGroup[${index}].termGroupDescription`} className="text-[13px] font-bold ">
                  Enter Definetion
                </label>
                <AutosizeTextarea
                  minRows={1}
                  maxRows={4}
                  id={`termGroup[${index}].termGroupDescription`}
                  name={`termGroup[${index}].termGroupDescription`}
                  className="px-3 py-2 border border-black  w-full text-[13px] mt-1 "
                  onChange={(event) =>
                    handleTermChange(index, "termGroupDescription", event.target.value)
                  }
                  onBlur={formik.handleBlur}
                  value={formik.values.termGroup[index].termGroupDescription}
                />
                {formik.touched.termGroup?.[index]?.termGroupDescription &&
                  formik.errors.termGroup?.[index]?.termGroupDescription && (
                    <div className="text-red-600 text-[10px]">{formik.errors.termGroup[index].termGroupDescription}</div>
                  )}
               </div>
              <div className="w-44 flex items-center ">
              {isTermImageUploaded[index] ? (
            <img src={formik.values.termGroup[index].termGroupImage.termImageURL} alt={`Term ${index + 1}`} className="w-28 h-14" />
             ) : (
            <label className="flex items-center mt-6 p-1 border border-blue-300  text-blue-500 text-[13px] cursor-pointer">
              <span>Select Image</span>
           <input
            hidden
            id={`termGroup[${index}].termGroupImage`}
            name={`termGroup[${index}].termGroupImage`}
            type="file"
            accept="image/*"
            onChange={(event) => handleTermImageChange(index, event.target.files[0])}
          />
           </label>
             )}
              </div>
              {formik.values.termGroup[index].termGroupName && (
              <div className="flex flex-col  space-y-1 ">
                <button
                type="button"
                onClick={() => removeTermField(index)}
                className="text-blue-500 text-[18px] mt-6 font-bold"
               >
                <AiOutlineDelete />
                </button>
               <button
                type="button"
                onClick={() => setEditingIndexAndFocus(index)}
                className="text-blue-500 text-[18px] font-bold "
               >
                <AiOutlineEdit />
               </button>
                </div>
              )}
             </motion.div>
          ))}
       
          </AnimatePresence>
        <div className="mt-10">
        
        <button type="button" onClick={addTermField}
        className="text-blue-500 text-[13px] "
        >
          +Add Term 
        </button>
        </div>
      </div>

      <div className="flex justify-center mt-10"
      >
      <button type="button"
      onClick={formik.handleSubmit}
     className="py-2 bg-red-600 w-48 text-white  text-[13px] rounded"
      >Create Card</button>
      </div>
       
        </div>
        </form>
  )
}
