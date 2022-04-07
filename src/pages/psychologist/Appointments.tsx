import * as React from 'react'
import {
  AppointmentModel,
  ViewState,
  SchedulerDateTime,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  AllDayPanel,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  Appointments as AppointmentsPlugin,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui'
import DSelect from '../../config/material-ui/DSelect'
import { MenuItem } from '@mui/material'

const appointments: Array<AppointmentModel> = [
  {
    startDate: '2022-04-08T10:00',
    endDate: '2022-04-08T11:15',
    title: 'Meeting',
    type: 'private',
  },
  {
    startDate: '2022-04-08T07:30',
    endDate: '2022-04-08T09:00',
    title: 'Go to a gym',
    type: 'work',
  },
]
const resources = [
  {
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'private', text: 'Private', color: '#EC407A' },
      { id: 'work', text: 'Work', color: '#7E57C2' },
    ],
  },
]

const Appointments: React.FC = () => {
  return (
    <Scheduler data={appointments}>
      <ViewState
        defaultCurrentViewName="Week"
      />
      <DayView startDayHour={7} endDayHour={20} />
      <WeekView startDayHour={7} endDayHour={20} />
      <MonthView />

      <Toolbar />
      <ViewSwitcher
        switcherComponent={(props) => {
          return (
            <DSelect
              variant="outlined"
              value={props.currentView.name}
              onChange={(evt) => props.onChange(evt.target.value as string)}
            >
              {props.availableViews.map((view) => (
                <MenuItem key={view.name} value={view.name}>
                  {view.displayName}
                </MenuItem>
              ))}
            </DSelect>
          )
        }}
      />

      <DateNavigator />
      <TodayButton />

      <AppointmentsPlugin />
      <AppointmentTooltip showCloseButton showOpenButton />
      <AppointmentForm readOnly />
      <AllDayPanel />
      <Resources data={resources} />
    </Scheduler>
  )
}

export default Appointments
