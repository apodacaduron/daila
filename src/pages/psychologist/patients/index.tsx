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
import { useDialog } from 'use-mui'
import TablePagination from '../../../components/common/TablePagination'
import CreatePatientDialog from '../../../components/patients/CreatePatientDialog'
import LoadingScreen from '../../../components/common/LoadingScreen'

const Patients: React.FC = () => {
  const { workspaceId } = useParams()
  const dialogInstance = useDialog()
  const getPatientsQuery = useGetPatientsQuery({ workspaceId })
  const patients = useNormalizeDocuments(getPatientsQuery)
  const hasPatients = Boolean(patients.length)
  console.log(patients, getPatientsQuery)

  return (
    <div className="patients">
      <TitleBar primary="Patients" secondary="View and manage your patients">
        <Button
          variant="contained"
          size="large"
          onClick={() => dialogInstance.setOpen(true)}
        >
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
      {hasPatients && !getPatientsQuery.isLoading && (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Updated at</TableCell>
                  <TableCell align="right">Created at</TableCell>
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
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phoneNumber}</TableCell>
                    <TableCell align="right">{row?.updatedAt?.toString()}</TableCell>
                    <TableCell align="right">{row.createdAt.toString()}</TableCell>
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
          <TablePagination>
            <Button disabled={!getPatientsQuery.hasNextPage} onClick={() => getPatientsQuery.fetchNextPage()}>Load more</Button>
          </TablePagination>
        </>
      )}
      {!hasPatients && !getPatientsQuery.isLoading && (
        <FeedbackCard
          primary="No results"
          secondary="Looks like you don't have any patients yet"
        >
          <NoRecordsSvg />
        </FeedbackCard>
      )}
      {getPatientsQuery.isLoading && <LoadingScreen />}
      <CreatePatientDialog
        open={dialogInstance.open}
        onClose={dialogInstance.handleClose}
        scroll="paper"
      />
    </div>
  )
}

export default Patients
