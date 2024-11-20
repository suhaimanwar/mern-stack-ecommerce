// "use client";
// import { brandApi } from "@/api/brandApi";
// import { Package } from "@/types/package";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import AlertDialog from "../Dialog/Dialog";
// import { useState } from "react";

// type Props = {
//   data: [
//     {
//       _id: string;
//       name: string;
//       description: string;
//     },
//   ];
// };

// const BrandTable = ({ data }: Props) => {
//   // console.log('datas:::::::::',data)

//   const router = useRouter();

//   const [open, setOpen] = useState(false);

//   const [deleteId, setDeleteId] = useState<string>();

//   const onClickDelete = (id: string) => {
//     setDeleteId(id);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const onDelete = async (id: any) => {
//     // console.log('id::::::',id)
//     await brandApi.deleteBrand(id);

//     router.refresh();
//   };

//   return (
//     <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
//       <div className="flex w-full justify-end">
//         <Link href="/brand/add">
//           <button
//             type="button"
//             className="mb-2 me-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
//           >
//             Add Brand
//           </button>
//         </Link>
//       </div>

//       <div className="max-w-full overflow-x-auto">
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
//               <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
//                 Brand Name
//               </th>
//               <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
//                 Brand Description
//               </th>
//               {/* <th className="min-w-[120px] px-4 py-4 font-medium text-dark dark:text-white">
//                 Status
//               </th> */}
//               <th className="px-4 py-4 text-right font-medium text-dark dark:text-white xl:pr-7.5">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index}>
//                 <AlertDialog
//                   open={open}
//                   onClose={handleClose}
//                   // key={index}
//                   onConfirmDelete={() => {
//                     onDelete(deleteId);
//                   }}
//                 />

//                 <td
//                   className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
//                 >
//                   <h5 className="text-dark dark:text-white">{item.name}</h5>
//                 </td>
//                 <td
//                   className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
//                 >
//                   <p className="text-dark dark:text-white">
//                     {item.description}
//                   </p>
//                 </td>

//                 <td
//                   className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === data.length - 1 ? "border-b-0" : "border-b"}`}
//                 >
//                   <div className="flex items-center justify-end space-x-3.5">
//                     <Link className="flex" href={`/brand/edit/${item._id}`}>
//                       <button className="hover:text-primary">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="20"
//                           height="20"
//                           viewBox="0 0 20 24"
//                         >
//                           <g
//                             fill="none"
//                             stroke="currentColor"
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
//                             stroke-width="1.7"
//                           >
//                             <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
//                             <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
//                           </g>
//                         </svg>
//                       </button>
//                     </Link>
//                     <button
//                       // onClick={()=>onDelete(item._id)}
//                       onClick={() => onClickDelete(item._id)}
//                       className="hover:text-primary"
//                     >
//                       <svg
//                         className="fill-current"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M8.59048 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5506 3.67715 13.5545 3.68768C13.7004 4.09111 14.0787 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25305 1.8748 8.41016 1.8749 8.59048 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
//                           fill=""
//                         />
//                         <path
//                           d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0798 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1693 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
//                           fill=""
//                         />
//                         <path
//                           d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
//                           fill=""
//                         />
//                         <path
//                           d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
//                           fill=""
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BrandTable;

"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { brandApi } from "@/api/brandApi";
import { useRouter } from "next/navigation";
import AlertDialog from "../Dialog/Dialog";
import { useDebounce } from "@/hooks/useDebounce";
import ServerSideToolbar from "@/utils/ServerSideToolbar";


type Props = {
  data: [
    {
      image: any;
      _id: string;
      name: string;
      description: string;
    },
  ];
};

export default function DataGridDemo() {

  const router = useRouter();


  const [total, setTotal] = React.useState<number>(0)
  const [rows, setRows] = React.useState<any[]>([])
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [paginationModel, setPaginationModel] = React.useState<any>(0)

  const query: any = useDebounce(searchValue, 0)

  type SortType = 'asc' | 'desc' | undefined | null

  const fetchTableData = React.useCallback( 
    async(sort: SortType, q:string) => {
      await brandApi.getAllBrands({query: {sort,q, page: paginationModel.page + 1}}).then(res => {

        console.log("response::::",res)
        setTotal(res.data.data?.totalCount)
        setRows(res.data.data?.paginatedResults)
      })
    },
    [paginationModel]

  )

  React.useEffect(()=>{
    fetchTableData('asc', query)
  }, [fetchTableData, query])

  const handleSearch = (value: string)=>{
    setSearchValue(value)
  }
  
 

  const [open, setOpen] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState<string>();

  const onClickDelete = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = async (id: any) => {
    // console.log('id::::::',id)
    await brandApi.deleteBrand(id);
    fetchTableData('asc', query)
  };
  const columns: GridColDef<(typeof rows)[number]>[] = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "image",
      headerName: "Image",
      // flex: 1,
      width: 100,
      cellClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200",
      headerClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200 ", 


      editable: false,
      renderCell: (params: any) => {
        const { row } = params;

        return (
          <Box sx={{ display: "flex", alignItems: "center"  }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", height: "100%" ,}}
              
            >
              <div className="flex h-full w-full flex-col items-center justify-center ">
                <Image
                  width={50}
                  height={50}
                  style={{ objectFit: "contain" }}
                  src={"http://localhost:5000/" + row.image}
                  alt="image"
                />
              </div>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: false,
      cellClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200",
      headerClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200", 
      
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      
      editable: false,
      cellClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200",
      headerClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200", 

    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      cellClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200",
      headerClassName: "dark:bg-gray-dark bg-white text-gray-800 dark:text-gray-200", 


      editable: false,
      renderCell: (params: any) => {
        const { row } = params;

        return (
          <div className="flex h-full items-center  space-x-3.5 ">
            <Link className="flex" href={`/brand/edit/${row._id}`}>
              <button className="hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.7"
                  >
                    <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                  </g>
                </svg>
              </button>
            </Link>
            <button
              // onClick={() => onDelete(row._id)}
              onClick={() => onClickDelete(row._id)}
              className="hover:text-primary"
            >
              <svg
                className="fill-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.59048 1.87502H11.4084C11.5887 1.8749 11.7458 1.8748 11.8941 1.89849C12.4802 1.99208 12.9874 2.35762 13.2615 2.88403C13.3309 3.01727 13.3805 3.16634 13.4374 3.33745L13.5304 3.61654C13.5461 3.66378 13.5506 3.67715 13.5545 3.68768C13.7004 4.09111 14.0787 4.36383 14.5076 4.3747C14.5189 4.37498 14.5327 4.37503 14.5828 4.37503H17.0828C17.4279 4.37503 17.7078 4.65485 17.7078 5.00003C17.7078 5.34521 17.4279 5.62503 17.0828 5.62503H2.91602C2.57084 5.62503 2.29102 5.34521 2.29102 5.00003C2.29102 4.65485 2.57084 4.37503 2.91602 4.37503H5.41609C5.46612 4.37503 5.47993 4.37498 5.49121 4.3747C5.92009 4.36383 6.29844 4.09113 6.44437 3.6877C6.44821 3.67709 6.45262 3.66401 6.46844 3.61654L6.56145 3.33747C6.61836 3.16637 6.66795 3.01728 6.73734 2.88403C7.01146 2.35762 7.51862 1.99208 8.1047 1.89849C8.25305 1.8748 8.41016 1.8749 8.59048 1.87502ZM7.50614 4.37503C7.54907 4.29085 7.5871 4.20337 7.61983 4.1129C7.62977 4.08543 7.63951 4.05619 7.65203 4.01861L7.7352 3.7691C7.81118 3.54118 7.82867 3.49469 7.84602 3.46137C7.9374 3.2859 8.10645 3.16405 8.30181 3.13285C8.33892 3.12693 8.38854 3.12503 8.6288 3.12503H11.37C11.6103 3.12503 11.6599 3.12693 11.697 3.13285C11.8924 3.16405 12.0614 3.2859 12.1528 3.46137C12.1702 3.49469 12.1877 3.54117 12.2636 3.7691L12.3468 4.01846L12.379 4.11292C12.4117 4.20338 12.4498 4.29085 12.4927 4.37503H7.50614Z"
                  fill=""
                />
                <path
                  d="M4.92859 7.04179C4.90563 6.69738 4.60781 6.43679 4.2634 6.45975C3.91899 6.48271 3.6584 6.78053 3.68136 7.12494L4.06757 12.9181C4.13881 13.987 4.19636 14.8505 4.33134 15.528C4.47167 16.2324 4.71036 16.8208 5.20335 17.2821C5.69635 17.7433 6.2993 17.9423 7.01151 18.0355C7.69653 18.1251 8.56189 18.125 9.63318 18.125H10.3656C11.4369 18.125 12.3023 18.1251 12.9873 18.0355C13.6995 17.9423 14.3025 17.7433 14.7955 17.2821C15.2885 16.8208 15.5272 16.2324 15.6675 15.528C15.8025 14.8505 15.86 13.987 15.9313 12.9181L16.3175 7.12494C16.3404 6.78053 16.0798 6.48271 15.7354 6.45975C15.391 6.43679 15.0932 6.69738 15.0702 7.04179L14.687 12.7911C14.6121 13.9143 14.5587 14.6958 14.4416 15.2838C14.328 15.8542 14.1693 16.1561 13.9415 16.3692C13.7137 16.5824 13.4019 16.7206 12.8252 16.796C12.2307 16.8738 11.4474 16.875 10.3217 16.875H9.67718C8.55148 16.875 7.76814 16.8738 7.17364 16.796C6.59697 16.7206 6.28518 16.5824 6.05733 16.3692C5.82949 16.1561 5.67088 15.8542 5.55725 15.2838C5.44011 14.6958 5.38675 13.9143 5.31187 12.7911L4.92859 7.04179Z"
                  fill=""
                />
                <path
                  d="M7.8539 8.5448C8.19737 8.51045 8.50364 8.76104 8.53799 9.10451L8.95466 13.2712C8.989 13.6146 8.73841 13.9209 8.39495 13.9553C8.05148 13.9896 7.74521 13.739 7.71086 13.3956L7.29419 9.22889C7.25985 8.88542 7.51044 8.57915 7.8539 8.5448Z"
                  fill=""
                />
                <path
                  d="M12.1449 8.5448C12.4884 8.57915 12.739 8.88542 12.7047 9.22889L12.288 13.3956C12.2536 13.739 11.9474 13.9896 11.6039 13.9553C11.2604 13.9209 11.0098 13.6146 11.0442 13.2712L11.4609 9.10451C11.4952 8.76104 11.8015 8.51045 12.1449 8.5448Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
        );
      },
    },

  ];
  // const rows = data.map((item) => ({
  //   id: item._id, // Assigning _id to id
  //   description: item.description,
  //   name: item.name,
  //   image: item.image,
  // }));

  // console.log("datas:::::", data);
  return (
    <Box
    sx={{
      height: 400,
      width: "100%",
      "& .MuiDataGrid-root": {
        borderColor: "#6b72804c !important", // Set border color for the entire DataGrid
        borderWidth: 1, // Optional: Adjust the border width
      },
      "& .MuiDataGrid-columnHeaders": {
        borderColor: "#6b72804c !important", // Customize the column header border
        borderWidth: 1,
        borderBottom: "1px solid #6b72804c !important", // Explicitly add bottom border
      },
      "& .MuiDataGrid-cell": {
        borderColor: "#6b72804c !important", // Customize cell borders
      },
      "& .MuiDataGrid-footerContainer": {
        borderColor: "#6b72804c !important", // Customize the footer border
        borderTop: "1px solid #6b72804c !important", // Add top border for footer
      },
      "& .MuiDataGrid-virtualScroller": {
        borderColor: "#6b72804c !important", // Border color around the scrolling area
      },
    }}
  >
      <AlertDialog
        open={open}
        onClose={handleClose}
        // key={index}
        onConfirmDelete={() => {
          onDelete(deleteId);
        }}
      />

      <div className="flex w-full justify-end">
        <Link href="/brand/add">
          <button
            type="button"
            className="mb-2 me-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Add Brand
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
      {/* <DataGrid
      
      className= "dark:bg-gray-dark bg-white w-[71rem] text-gray-800 "
      
        rows={rows}
        columns={columns} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        
        rowHeight={80} 
        
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        
      /> */}

<DataGrid
          autoHeight
          rows={rows || []}
          rowCount={total}
          columns={columns}
          getRowId={row => row._id}
          pagination
          sortingMode='server'
          paginationMode='server'
          // pageSizeOptions={[5,15, 50]}
          initialState={{
            
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: ServerSideToolbar }}
          slotProps={{
            baseButton: {
              size: 'medium',
              variant: 'tonal'
            },
            toolbar: {
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 1000 },
              value: searchValue,
              clearSearch: () => handleSearch(''),
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
        />
      </div>
    </Box>
  );
}

