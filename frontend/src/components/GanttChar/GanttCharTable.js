import React from 'react';
import './gantt.css';

const GanttChartTable = ({ data }) => {
    const availableProcessorsSet = new Set();
    data.forEach(item => {
      item.processorTaskId.forEach(processorTask => {
        availableProcessorsSet.add(processorTask.processor);
      });
    });
    const availableProcessors = Array.from(availableProcessorsSet);
  
    // Create the table structure
    const table = [];
    availableProcessors.forEach(processor => {
      const row = [];
      data.forEach(item => {
        const task = item.processorTaskId.find(task => task.processor === processor);
        row.push(task ? "id: " +  task.taskId + " - " + task.name : '');
      });
      table.push(row);
    });

  return (
    <table className="gantt-table">
      <thead>
        <tr>
          <th>Time Unit</th>
          {data.map(item => (
            <th key={item.timeUnit}>{item.timeUnit}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {availableProcessors.map((processor, index) => (
          <tr key={processor}>
            <td>Processor {processor}</td>
            {table[index].map((taskId, idx) => (
              <td key={idx}>{taskId}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GanttChartTable;