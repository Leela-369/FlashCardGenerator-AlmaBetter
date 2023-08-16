import * as Yup from 'yup';

//contains schema for validation of user entries
const schema = Yup.object().shape({
    mainGroup: Yup.object().shape({
      mainGroupName: Yup.string()
      .required("Group name is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*,)(+=._-]{3,20}$/g, "Invalid characters")
      .min(3,"Group name atleast required 3 characters")
      .max(20, "Group name can not exceeded  20 characters"),
      
      mainGroupDescription: Yup.string()
      .required(" Description is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*,)(+=._-]{12,500}$/g, "Invalid characters")
      .min(12, "Description atleast required 12 characters")
      .max(500, "Description can not exceeded 500 characters"),
      
      mainGroupImage: Yup.mixed()
      .required(" Image is required ")
    }),

    termGroup: Yup.array().of(
      Yup.object().shape({
        termGroupName: Yup.string()
        .required("Term name is required")
        .matches(/^[a-zA-Z0-9!@#$%^&,* )(+=._-]{3,20}$/g, "Invalid characters")
        .min(3, "Term name atleast required 3 characters")
        .max(20, "Term name can not exceeded 20 characters"),

        termGroupDescription: Yup.string()
        .required("Term description is required")
        .matches(/^[a-zA-Z0-9!@#$%^&,* )(+=._-]{12,500}$/g, "Invalid characters")
        .min(12,"Term description atleast required 12 characters")
        .max(500, "Term description can not exceeded 500 characters"),

        termGroupImage: Yup.mixed()
        .required(" Image is required")
      })
    ),
  });

  export default schema;