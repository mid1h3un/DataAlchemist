import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataTable({ fileName, rows = [], errors = [] }) {
  if (!rows || rows.length === 0) return null;

  const columns = Object.keys(rows[0] || {}).map((key) => ({
    field: key,
    headerName: key,
    width: 150,
    editable: true,
    cellClassName: (params) => {
      const hasError = errors.some(
        (e) => e.row === params.id && e.field === key
      );
      return hasError ? 'cell-error' : '';
    },
  }));

  const gridRows = rows.map((row, i) => ({ id: i, ...row }));

  return (
    <div className="section">
      <h2>{fileName}</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={gridRows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default DataTable;
