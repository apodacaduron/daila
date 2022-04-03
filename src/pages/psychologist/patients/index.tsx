import {
  FilterListOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import FeedbackCard from '../../../components/common/FeedbackCard'
import TableToolbar from '../../../components/common/TableToolbar'
import TitleBar from '../../../components/common/TitleBar'
import { useGetPatientsQuery } from '../../../composables/usePatient'
import DTextField from '../../../config/material-ui/DTextField'
import { useNormalizeDocuments } from '../../../hooks/useNormalizeDocuments'
import { ReactComponent as NoRecordsSvg } from '../../../assets/svg/no-records.svg'

const Patients: React.FC = () => {
  const { workspaceId } = useParams()
  const getPatientsQuery = useGetPatientsQuery({ workspaceId })
  const patients = useNormalizeDocuments(getPatientsQuery)
  const hasPatients = Boolean(patients.length)
  console.log(patients, getPatientsQuery)

  return (
    <div className="patients">
      <TitleBar primary="Patients" secondary="View and manage your patients">
        <Button variant="contained" size="large">
          Create a patient
        </Button>
      </TitleBar>
      <TableToolbar
        actions={
          <>
            <DTextField
              size="small"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
            />
            <IconButton>
              <FilterListOutlined />
            </IconButton>
          </>
        }
      />
      {hasPatients && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!hasPatients && (
        <FeedbackCard
          primary="No results"
          secondary="Looks like you don't have any patients yet"
        >
          <NoRecordsSvg />
        </FeedbackCard>
      )}
    </div>
  )
}

export default Patients
