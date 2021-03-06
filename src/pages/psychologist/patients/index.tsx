import {
  DeleteOutlined,
  EditOutlined,
  FilterListOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import {
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
import { useDialog, useMenu } from 'use-mui'
import TablePagination from '../../../components/common/TablePagination'
import CreatePatientDialog from '../../../components/patients/CreatePatientDialog'
import LoadingScreen from '../../../components/common/LoadingScreen'
import DMenu from '../../../config/material-ui/DMenu'
import React from 'react'
import { LoadingButton } from '@mui/lab'

const Patients: React.FC = () => {
  const { workspaceId } = useParams()
  const dialogInstance = useDialog()
  const getPatientsQuery = useGetPatientsQuery({ workspaceId })
  const patients = useNormalizeDocuments(getPatientsQuery)
  const hasPatients = Boolean(patients.length)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuInstance = useMenu({
    onClose: () => {
      setAnchorEl(null)
    },
  })
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    menuInstance.setOpen(true)
  }

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
                    <TableCell align="right">
                      {row?.updatedAt?.toString()}
                    </TableCell>
                    <TableCell align="right">
                      {row.createdAt.toString()}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={openMenu}>
                        <MoreVertOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination>
            <LoadingButton
              loading={getPatientsQuery.isFetching}
              disabled={!getPatientsQuery.hasNextPage}
              onClick={() => getPatientsQuery.fetchNextPage()}
            >
              Load more
            </LoadingButton>
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

      <DMenu
        anchorEl={anchorEl}
        onClose={menuInstance.handleClose}
        open={menuInstance.open}
      >
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <EditOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={menuInstance.handleClose}>
          <ListItemIcon>
            <DeleteOutlined fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </DMenu>
    </div>
  )
}

export default Patients
