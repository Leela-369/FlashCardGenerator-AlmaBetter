import React from "react";

export const CreateNewFlashCard = () => {
  return (
    <form >
    <div className="mt-3 h-auto w-full ">
      <div className="bg-white p-4">
        <div className="flex">
          <div className="w-1/2 mr-4">
            <p className="text-[13px] font-bold mb-2">Group Name</p>
            <input
            id="groupName"
            name="groupName"
            type="text"
            className="px-3 py-2 border border-black h-9 w-full text-10px"
           //formik logic here ; onChange and onBlur events to be added
          />
         {/* error to be added */}
          </div>
        {/* main group image logic here using formik */}
        </div>
        </div>
        <div className="mt-2 w-3/4">
          <p className="font-bold text-[13px] mb-2">Description</p>
          <textarea
            id="description"
            name="description"
            className="px-3 py-2 border border-black h-20 w-full text-[13px]"
          //onChange and Onblur events to be added
          />
          {/* errors to be shown here */}
      </div>
        </div>
        </form>
  )
}
