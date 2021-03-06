import React from 'react';
import { Label, Menu, MenuItem, Table } from 'semantic-ui-react';
import Select from 'react-select';

const rowsPerPageOptions = [5, 10, 20, 50].map(num => ({
  value: num,
  label: `${num} Items`,
}));

const Pagination = props => {
  if (!props.data.length) return null;

  const maxRowOptionAvailable = (
    rowsPerPageOptions.find(obj => obj.value >= props.rowCount) || rowsPerPageOptions[rowsPerPageOptions.length - 1]
  ).value;
  const pageOptions = rowsPerPageOptions.filter(obj => +obj.value <= +maxRowOptionAvailable);
  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell className='paginationFooter' colSpan={props.numberOfColumns}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Label ribbon>
              Total {props.name} : {props.rowCount}
            </Label>
            {props.rowCount > 5 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    color: '#26547c',
                    fontSize: '13px',
                    fontWeight: 'normal',
                    margin: '0px 15px',
                  }}
                >
                  Show
                </span>
                <Select
                  style={{
                    width: '115px',
                    fontWeight: 'normal',
                  }}
                  value={props.rowsPerPage}
                  options={pageOptions}
                  onChange={props.onSelectRowsPerPage}
                  isClearable={false}
                  isSearchable={false}
                />
                <Menu floated='right' pagination>
                  <MenuItem icon='angle double left' page={1} onClick={props.handlePageClick} />
                  <MenuItem data-direction='LEFT' onClick={props.handleDirectionClick} icon='angle left' />
                  {props.pageRange.map((pageIndex, index) => (
                    <MenuItem
                      key={`table-footer-${index}`}
                      content={`${pageIndex}`}
                      page={pageIndex}
                      onClick={props.handlePageClick}
                      active={pageIndex === props.currentPage}
                      as='a'
                    />
                  ))}
                  <MenuItem data-direction='RIGHT' onClick={props.handleDirectionClick} icon='angle right' />
                  <MenuItem icon='angle double right' page={props.numberOfPages} onClick={props.handlePageClick} />
                </Menu>
              </div>
            )}
          </div>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
};

export default Pagination;
