import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import {
  PlayArrow as DuplicateIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { Card, useTheme } from '@mui/material'
import { useTimer } from '../../context'
import { CategoryCell, DateTimeCell, DurationCell, ProjectCell } from './renderers'

export const TimeTable = () => {
  const theme = useTheme()
  const { categories, projects, records = [], updateRecord, deleteRecord, duplicateAndStartNewRecord } = useTimer()
  const columns = [
    {
      field: 'project',
      headerName: 'Project',
      type: 'singleSelect',
      valueOptions: projects.map(proj => ({
        value: proj.id,
        label: proj.name,
      })),
      width: 200,
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
      width: 130,
      renderCell: d => <DateTimeCell datetime={ d.row.startTime } />,
      editable: true,
    },
    {
      field: 'endTime',
      headerName: 'End Time',
      type: 'dateTime',
      width: 130,
      renderCell: d => <DateTimeCell datetime={ d.row.endTime } />,
      editable: true,
    },
    {
      field: 'duration',
      headerName: 'Duration',
      type: 'string',
      width: 130,
      renderCell: d => <DurationCell startTime={ d.row.startTime } endTime={ d.row.endTime } />,
      editable: false,
    },
    {
      field: '',
      headerName: 'Actions',
      type: 'actions',
      getActions: ({ id }) => [
        <GridActionsCellItem
          key="delete-record-action"
          icon={ <DeleteIcon /> }
          label="Delete Record"
          onClick={ () => deleteRecord(id) }
          sx={{ ':hover': { color: theme.palette.error.dark } }}
        />,
        <GridActionsCellItem
          key="duplicate-record-action"
          icon={ <DuplicateIcon /> }
          label="Duplicate Record"
          onClick={ () => duplicateAndStartNewRecord(id) }
          sx={{ ':hover': { color: theme.palette.primary.dark } }}
        />,
      ],
    },
  ]

  const processRowUpdate = newRow => {
    updateRecord(newRow.id, newRow)
    return newRow
  }
 
  return (
    <Card
      component={ DataGrid }
      columns={ columns }
      rows={ records }
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
      processRowUpdate={ processRowUpdate }
    />
  )
}
