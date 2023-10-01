import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Modal from "../../../components/Modal";

const ShowTeachers = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher,
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  console.log(teachersList);

  // if (loading) {
  //   return <div>Loading...</div>;
  // } else if (response) {
  //   return (
  //     <Box
  //       sx={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}
  //     >
  //       <GreenButton
  //         variant="contained"
  //         onClick={() => navigate("/Admin/teachers/chooseclass")}
  //       >
  //         Add Teacher
  //       </GreenButton>
  //     </Box>
  //   );
  // } else if (error) {
  //   console.log(error);
  // }
  //
  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllTeachers(currentUser._id));
    });
  };

  // // const columns = [
  // //     { id: 'name', label: 'Name', minWidth: 170 },
  // //     { id: 'teachSubject', label: 'Subject', minWidth: 100 },
  // //     { id: 'teachSclass', label: 'Class', minWidth: 170 },
  // // ];
  //
  // let columns = [
  //   { id: "name", label: "Name", minWidth: 170 },
  //   { id: "teachSubject", label: "", minWidth: 100 },
  //   { id: "teachSclass", label: "", minWidth: 170 },
  // ];
  //
  // // const rows = teachersList.map((teacher) => {
  // //   return {
  // //     name: teacher.name,
  // //     teachSubject: teacher.teachSubject?.subName || null,
  // //     teachSclass: teacher.teachSclass.sclassName,
  // //     teachSclassID: teacher.teachSclass._id,
  // //     id: teacher._id,
  // //   };
  // // });
  // //
  // // console.log(rows);
  // console.log(teachersList);
  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
    },
  ];

  // let teachersList = [
  //   {
  //     name: "Teacher 1",
  //     teachSubject: "Subject 1",
  //     teachSclass: "Class 1",
  //     teachSclassID: "1",
  //     id: "1",
  //   },
  //
  //   {
  //     name: "Teacher 2",
  //     teachSubject: "Subject 2",
  //     teachSclass: "Class 2",
  //     teachSclassID: "2",
  //     id: "2",
  //   },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  function closeModal() {
    setIsModalOpen(false);
    setSelectedTeacher(null);
  }

  const pageNumbers = [];

  const [itemsPerPage] = useState(2); // Number of items to display per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachersList.slice(indexOfFirstItem, indexOfLastItem);

  for (let i = 1; i <= Math.ceil(teachersList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // <Paper sx={{ width: "100%", overflow: "hidden" }}>
    //   {/*<TableContainer>*/}
    //   {/*  <Table stickyHeader aria-label="sticky table">*/}
    //   {/*    <TableHead>*/}
    //   {/*      <StyledTableRow>*/}
    //   {/*        {columns.map((column) => (*/}
    //   {/*          <StyledTableCell*/}
    //   {/*            key={column.id}*/}
    //   {/*            align={column.align}*/}
    //   {/*            style={{ minWidth: column.minWidth }}*/}
    //   {/*          >*/}
    //   {/*            {column.label}*/}
    //   {/*          </StyledTableCell>*/}
    //   {/*        ))}*/}
    //   {/*        <StyledTableCell align="center"></StyledTableCell>*/}
    //   {/*      </StyledTableRow>*/}
    //   {/*    </TableHead>*/}
    //   {/*    <TableBody>*/}
    //   {/*      /!*{rows*!/*/}
    //   {/*      /!*  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*!/*/}
    //   {/*      /!*  .map((row) => {*!/*/}
    //   {/*      /!*    return (*!/*/}
    //   {/*      /!*      <StyledTableRow*!/*/}
    //   {/*      /!*        hover*!/*/}
    //   {/*      /!*        role="checkbox"*!/*/}
    //   {/*      /!*        tabIndex={-1}*!/*/}
    //   {/*      /!*        key={row.id}*!/*/}
    //   {/*      /!*      >*!/*/}
    //   {/*      /!*        {columns.map((column) => {*!/*/}
    //   {/*      /!*          const value = row[column.id];*!/*/}
    //   {/*      /!*          if (column.id === "teachSubject") {*!/*/}
    //   {/*      /!*            return (*!/*/}
    //   {/*      /!*              <StyledTableCell key={column.id} align={column.align}>*!/*/}
    //   {/*      /!*                {value ? (*!/*/}
    //   {/*      /!*                  value*!/*/}
    //   {/*      /!*                ) : (*!/*/}
    //   {/*      /!*                  <Button*!/*/}
    //   {/*      /!*                    variant="contained"*!/*/}
    //   {/*      /!*                    onClick={() => {*!/*/}
    //   {/*      /!*                      navigate(*!/*/}
    //   {/*      /!*                        `/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`,*!/*/}
    //   {/*      /!*                      );*!/*/}
    //   {/*      /!*                    }}*!/*/}
    //   {/*      /!*                  >*!/*/}
    //   {/*      /!*                    Add Subject*!/*/}
    //   {/*      /!*                  </Button>*!/*/}
    //   {/*      /!*                )}*!/*/}
    //   {/*      /!*              </StyledTableCell>*!/*/}
    //   {/*      /!*            );*!/*/}
    //   {/*      /!*          }*!/*/}
    //   {/*      /!*          return (*!/*/}
    //   {/*      /!*            <StyledTableCell key={column.id} align={column.align}>*!/*/}
    //   {/*      /!*              {column.format && typeof value === "number"*!/*/}
    //   {/*      /!*                ? column.format(value)*!/*/}
    //   {/*      /!*                : value}*!/*/}
    //   {/*      /!*            </StyledTableCell>*!/*/}
    //   {/*      /!*          );*!/*/}
    //   {/*      /!*        })}*!/*/}
    //   {/*      /!*        <StyledTableCell align="center">*!/*/}
    //   {/*      /!*          <IconButton*!/*/}
    //   {/*      /!*            onClick={() => deleteHandler(row.id, "Teacher")}*!/*/}
    //   {/*      /!*          >*!/*/}
    //   {/*      /!*            <PersonRemoveIcon color="error" />*!/*/}
    //   {/*      /!*          </IconButton>*!/*/}
    //   {/*      /!*          <BlueButton*!/*/}
    //   {/*      /!*            variant="contained"*!/*/}
    //   {/*      /!*            onClick={() =>*!/*/}
    //   {/*      /!*              navigate("/Admin/teachers/teacher/" + row.id)*!/*/}
    //   {/*      /!*            }*!/*/}
    //   {/*      /!*          >*!/*/}
    //   {/*      /!*            View*!/*/}
    //   {/*      /!*          </BlueButton>*!/*/}
    //   {/*      /!*        </StyledTableCell>*!/*/}
    //   {/*      /!*      </StyledTableRow>*!/*/}
    //   {/*      /!*    );*!/*/}
    //   {/*      /!*  })}*!/*/}
    //   {/*    </TableBody>*/}
    //   {/*  </Table>*/}
    //   {/*</TableContainer>*/}
    //   {/*<TablePagination*/}
    //   {/*  rowsPerPageOptions={[5, 10, 25, 100]}*/}
    //   {/*  component="div"*/}
    //   {/*  count={rows.length}*/}
    //   {/*  rowsPerPage={rowsPerPage}*/}
    //   {/*  page={page}*/}
    //   {/*  onPageChange={(event, newPage) => setPage(newPage)}*/}
    //   {/*  onRowsPerPageChange={(event) => {*/}
    //   {/*    setRowsPerPage(parseInt(event.target.value, 5));*/}
    //   {/*    setPage(0);*/}
    //   {/*  }}*/}
    //   {/*/>*/}
    //
    //   <SpeedDialTemplate actions={actions} />
    // </Paper>

    // {
    //   "subject_id": "6513720ff732e6ce55c10645",
    //   "subjectName": "MATHEMATICS"
    // }

    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              {/* Add other table headers here */}
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((teacher) => (
              <tr
                key={teacher._id.toString()}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {teacher.name}
                </th>

                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedTeacher(teacher);
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </button>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <IconButton
                    onClick={() => deleteHandler(teacher._id, "Teacher")}
                  >
                    <PersonRemoveIcon color="error" />
                  </IconButton>
                  <BlueButton
                    variant="contained"
                    onClick={() =>
                      navigate("/Admin/teachers/teacher/" + teacher._id)
                    }
                  >
                    Assign Subject
                  </BlueButton>
                </th>
                {/* Add other table columns here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold">{indexOfFirstItem + 1}</span>
          to <span className="font-semibold">{indexOfLastItem}</span> of
          <span className="font-semibold">{teachersList.length}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`${
                currentPage === pageNumber
                  ? "bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                  : "text-gray-700 hover:text-gray-900 dark:text-gray-400"
              } flex items-center justify-center px-3 h-8 text-sm font-medium rounded-lg`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      <SpeedDialTemplate actions={actions} />
      <Modal
        teacher={selectedTeacher}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ShowTeachers;
