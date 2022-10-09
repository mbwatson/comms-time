import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { useTimer } from '../../context'
import { CategoryCell, DateTimeCell, ProjectCell } from './renderers'

export const TimeTable = () => {
  const { categories, projects, records, deleteRecord } = useTimer()
  const columns = [
    {
      field: 'project',
      headerName: 'Project',
      type: 'singleSelect',
      valueOptions: projects.map(proj => ({
        value: proj.id,
        label: proj.name,
      })),
      width: 120,
      editable: true,
      renderCell: d => <ProjectCell projectId={ d.row.project } />,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      type: 'singleSelect',
      valueOptions: categories.map(cat => ({
        value: cat.id,
        label: cat.name,
      })),
      editable: true,
      renderCell: d => <CategoryCell categoryId={ d.row.category } />
    },
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      flex: 1,
      editable: true,
    },
    {
      field: 'startTime',
      headerName: 'Start Time',
      type: 'dateTime',
      width: 200,
      renderCell: d => <DateTimeCell datetime={ d.row.startTime } />,
      editable: true,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      type: 'dateTime',
      width: 200,
      renderCell: d => <DateTimeCell datetime={ d.row.endTime } />,
      editable: true,
    },
    {
      headerName: '',
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="delete-record-action"
          icon={ <DeleteIcon /> }
          label="Delete Record"
          onClick={ () => deleteRecord(id) }
        />,
      ],
    },
  ]
 
  return (
    <DataGrid
      columns={ columns }
      rows={ records }
      sx={{ backgroundColor: '#66778811', }}
      disableSelectionOnClick
    />
  )
}
