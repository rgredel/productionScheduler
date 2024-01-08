import React, { useEffect, useRef, useState } from 'react';
import { Chart } from "react-google-charts";
import './gantt.css';
import Graph from './Graph';
import GanttGraph from './GanttGraph';
import Navbar from '../Navbar/Navbar';

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
]

const rows = [
  [
    "2014Spring",
    "Spring 2014",
    "spring",
    null,
    null,
    2,
    100,
    null,
  ],
  [
    "2014Summer",
    "Summer 2014",
    "abc",
    null,
    null,
    1,
    100,
    "2014Spring",
  ],
  [
    "abc",
    "Summer 2012",
    "abc",
    null,
    null,
    2,
    100,
    "2014Summer",
  ]
]

const dataG = [columns, ...rows];

const options = {
  gantt: {
    percentEnabled: false,
    criticalPathEnabled: false,
    percentDoneEnabled: false
  },

};

const mockedData = {
  processName: "Process Name",
  scheduleData: [
    {
      processorTaskId: 0,
      tasks: [
        {
          taskId: 0,
          taskName: 'Moje Zadanie 1',
          taskTimeUnit: 1
        },
        {
          taskId: 1,
          taskName: 'Moje Zadanie 2',
          taskTimeUnit: 1
        },
        {
          taskId: 2,
          taskName: 'Moje Zadanie 3',
          taskTimeUnit: 2
        }
      ]
    },
    {
      processorTaskId: 1,
      tasks: [
        {
          taskId: 4,
          taskName: 'Moje Zadanie 4',
          taskTimeUnit: 1
        },
        {
          taskId: 5,
          taskName: 'Moje Zadanie 5',
          taskTimeUnit: 1
        }
      ]
    },
  ]
};

const GanttChartTable = ({ data }) => {
  
  const [isGanttGraphEnabled, setGanttGraph] = useState(false);

  useEffect(() => {
    const graphEnabledFromStorage = localStorage.getItem('isGanttGraphEnabled') || false;

    setGanttGraph(JSON.parse(graphEnabledFromStorage));
  }, [])

  const handleClick = () => {
    setGanttGraph(!isGanttGraphEnabled);
    localStorage.setItem('isGanttGraphEnabled', !isGanttGraphEnabled);
  }

  return (<div>
    <Navbar />
        <main className='graph-wrapper'>
            
            <div className='graph-header'>
              <h1 className='process-name'>{data.processName}</h1>
              <button className={`switch-graph ${isGanttGraphEnabled ? 'on' : 'off'}`} onClick={handleClick}></button>
            </div>
            {isGanttGraphEnabled ? <GanttGraph schedule={data.scheduleData} /> : <Graph schedule={data.scheduleData} />}
          </main>
  </div>

  )
};

export default GanttChartTable;