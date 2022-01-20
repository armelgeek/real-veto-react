import React from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="form-control"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Rechercher...`}
    />
  );
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div w={200}>
      <input
        className="form-control"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Rechercher ...`}
      />
    </div>
  );
}
export default function DataTable({
  columns,
  data,
  meta,
  addUrl,
  urlName,
  footer,
  tip = "",
  filter = true,
  paginate = true,
  guide,
}) {
  const colspan = columns.length;
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="d-flex my-2 justify-content-between align-items-center">
        {filter && (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        )}
        <div>
          {addUrl && urlName && (
            <Link
              className="btn btn-sm btn-green"
              variant="solid"
              to={addUrl}
            >
              {urlName}
            </Link>
          )}
        </div>
      </div>
      {tip && <h3>{tip}</h3>}
      <table {...getTableProps()} className="table table-bordered striped">
        <thead className="bg-thead ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {meta.isFetching ? (
            <td colSpan={colspan} className="text-center">
              <p>Chargement des données en cours ....</p>
            </td>
          ) : (
            <>
              {page.length == 0 && (
                <tr>
                  <td colSpan={colspan} style={( guide ? {"textAlign":"left"} : {"textAlign":"center"})}>
                    {guide ? (
                      <div
                        style={{
                          width: "100%",
                          color: "blue.700",
                          backgroundColor: "gray.200",
                          padding: "10px",
                        }}
                      >
                        <h3 className="py-3">{tip}</h3>
                        {guide}
                      </div>
                    ) : (
                      "Aucune enregistrement à afficher"
                    )}
                  </td>
                </tr>
              )}
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr p={0} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        fontSize="11px"
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
        {footer && (
          <tfoot bg={"blue.900"}>
            <tr>
              <td colSpan={colspan} color={"white"}>
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
      {paginate && (
        <div className="d-flex  justify-content-between align-items-center py-3">
          <div style={{ width: "200px" }}>
            <div className="d-flex justify-content-center align-items-center">
              <input
                className="form-control  mr-2"
                // eslint-disable-next-line react-hooks/rules-of-hooks
                type="number"
                placeholder="Page"
                value={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
              />
              <select
                // eslint-disable-next-line react-hooks/rules-of-hooks
                className="form-control"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
                size="sm"
              >
                {[5, 10, 20, 30, 40, 50, 100, 150, 250].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <>
              Page{" "}
              <strong>
                {pageIndex > 0 ? pageIndex + 1 : 1} sur {pageOptions.length}
              </strong>{" "}
            </>
          </div>
          <div className="mb-6">
            <div>
              <button
                className="mr-2 btn btn-sm btn-green"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<<"} Précedent
              </button>
              <button
                className="mr-2 btn btn-sm btn-green"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Suivant {">>"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
