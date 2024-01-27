import React,{useState,useEffect, useMemo} from "react";
import classnames from 'classnames';
import { usePagination, DOTS } from '../../hooks/usePagination';
import _ from 'lodash';
import {
  useTable,
} from "react-table";
import { Link } from "react-router-dom";
import Gate from "../../components/Gate";
export default function DataTable({
  columns,
  data = [],
  scopes = [],
  meta,
  addUrl,
  urlName,
  footer,
  tip = "",
  filter = true,
  paginate = true,
  func = null,
  guide,
}) {
  return (
    <>
      <DataTableData
        columns={columns}
        data={meta.isFetching ? [] : data}
        meta={meta}
        scopes={scopes}
        addUrl={addUrl}
        urlName={urlName}
        footer={footer}
        tip={tip}
        filter={filter}
        paginate={paginate}
        guide={guide}
        func={func}
      />
    </>
  );
}
function DataTableData({
  columns,
  data = [],
  scopes = [],
  meta,
  addUrl,
  urlName,
  footer,
  tip = "",
  filter = true,
  func = null,
  guide,
  
}) {
  const [pageData, setPageData] = useState({
    rowData: data,
    totalPages: 0,
    totalItems: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if(!meta.isFetching){
      setPageData({
        rowData: data,
        totalPages: meta.totalPages,
        totalItems: meta.totalItems,
      })
    }
  },[data,meta])
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {addUrl && urlName && (
            <Gate scopes={scopes}>
              <Link
                className="btn btn-sm btn-green"
                variant="solid"
                to={addUrl}
              >
                {urlName}
              </Link>
            </Gate>
          )}
        </div>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-between">
        <div>{tip && <h3 className="text-uppercase">{tip}</h3>}</div>

      </div>
        <AppTable
          columns={columns}
          data={pageData.rowData}
          isLoading={meta.isFetching}
        />
        {footer && (
          <div bg={"blue.900"}>
            <tr>
              <td colSpan={colspan} color={"white"}>
                {footer}
              </td>
            </tr>
          </div>
        )}
      {_.isFunction(func) && pageData.totalPages && (<Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={pageData.totalItems}
        func={func}
        pageSize={10}
        onPageChange={page => {
          setCurrentPage(page);
          if(_.isFunction(func)){
            func(page,10);
          }
         
        }}
      />)}
    </>
  );
}
const AppTable = ({ columns, data,currentPage, setCurrentPage,isLoading = false }) => {
  const columnData = useMemo(() => columns, [columns]);
  const rowData = useMemo(() => data, [data]);
  const colspan = columns.length;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columnData,
    data: rowData,
  });
  return (
    <div style={{
      position:'relative'
    }}>
       
        {isLoading && (<div colSpan={colspan} style={{
          position:'absolute',
          top:0,
          right:0,
          left:0,
          bottom:0,
          backgroundColor:"rgba(0,0,0,0)",
          zIndex:10000,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }} className="text-center">
          <div style={{
            color: 'white',
            fontSize:"14px",
            backgroundColor:"rgba(0,0,0,0.3)",
            padding:"20px"
          }}>Chargement des données en cours ....</div>
        </div>)}
        <table {...getTableProps()}  className="table table-bordered striped">
        <thead  className="bg-thead ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
  );
};


const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};