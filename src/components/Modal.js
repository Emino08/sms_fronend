import { IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { BlueButton } from "./buttonStyles";
import React from "react";

function Modal({ teacher, isOpen, onClose, onDelete }) {
  if (!isOpen || !teacher) {
    return null; // Don't render the modal if it's not open or if no teacher is selected.
  }

  function deleteHandler(id, _subject_id, _class_id) {}

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, show/hide based on modal state. */}

        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal panel, show/hide based on modal state. */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Teacher profile picture */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  {teacher.name}
                </h3>
                <div className="mt-2">
                  {/*<p className="text-sm text-gray-500">{teacher.teachSclass}</p>*/}
                  {/*loop through and list all the subjects that*/}
                  {/*belong to the teacher and a delete button for each subject*/}

                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Class
                          </th>
                          {/* Add other table headers here */}
                          <th scope="col" className="px-6 py-3">
                            Subject name
                          </th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teacher.teachSubjects.map((subject, i) => (
                          <tr
                            key={subject.subject_id}
                            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {teacher.teachClasses[i].className}
                            </th>

                            <td className="px-6 py-4">{subject.subjectName}</td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <IconButton
                                onClick={() =>
                                  deleteHandler(
                                    teacher.id,
                                    subject._subject_id,
                                    teacher.teachClasses[i]._id,
                                  )
                                }
                              >
                                <PersonRemoveIcon color="error" />
                              </IconButton>
                            </th>
                            {/* Add other table columns here */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/*))}*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
