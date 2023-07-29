import * as Yup from 'yup' 

const schema = Yup.object().shape({
    mainGroup: Yup.object().shape({
      mainGroupName: Yup.string()
      .required("Group name is required")
      .min(3,"Group name atleast required 3 characters")
      .max(20, "Group name can not exceeded  20 characters")
      ,
      mainGroupDescription: Yup.string()
      .required(" Description is required")
      .min(12, "Description atleast required 12 characters")
      .max(500, "Description can not exceeded 500 characters")

    }),
    termGroup: Yup.array().of(
      Yup.object().shape({
        termGroupName: Yup.string()
        .required("Term name is required")
        .min(3, "Term name atleast required 3 characters")
        .max(20, "Term name can not exceeded 20 characters"),
        termGroupDescription: Yup.string()
        .required("Term description is required")
        .min(12,"Term description atleast required 12 characters")
        .max(500, "Term description can not exceeded 500 characters"),

      })
    ),
  });

  export default schema;