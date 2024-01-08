import React, { useEffect, useRef, useState } from "react";
import { generateRandomColor } from "./generateRandomColor";

const Task = ({ task, dynamicProcessorWidth, dynamicWidth, dynamicTasksNameWidth, dynamicUnitWidth }) => {

    const taskNameRef = useRef(null);
    const ganttTaskHolderRef = useRef(null);

    useEffect(() => {
        if (taskNameRef && taskNameRef.current) {
            const taskNameStyle = taskNameRef.current.style;
            taskNameStyle.setProperty('--task-width-after', `calc(${dynamicWidth} - ${dynamicProcessorWidth - 4}px)`);
            taskNameStyle.setProperty('--dynamic-processor-width', `${dynamicProcessorWidth - 4}px`);
            const taskNameHeight = taskNameRef.current.offsetHeight;
            taskNameStyle.setProperty('--task-height-after', `${taskNameHeight / 2}px`);

        }

        if (ganttTaskHolderRef && ganttTaskHolderRef.current) {
            const ganttTaskHolderStyle = ganttTaskHolderRef.current.style;
            ganttTaskHolderStyle.setProperty('--gantt-task-holder-width', `${dynamicProcessorWidth + dynamicTasksNameWidth}px`);
            ganttTaskHolderStyle.setProperty('--dynamic-width', `calc(${dynamicWidth} - ${dynamicProcessorWidth + dynamicTasksNameWidth}px)`);
            ganttTaskHolderStyle.setProperty('--bar-color', task.color);
            ganttTaskHolderStyle.setProperty('--bar-width', `calc(${dynamicUnitWidth * task.timeUnit.length}px - 2rem)`);
            ganttTaskHolderStyle.setProperty('--bar-margin', `calc(${dynamicUnitWidth * task.timeUnit[0]}px + 1rem)`);
        }
    }, [taskNameRef, dynamicProcessorWidth, dynamicWidth, dynamicTasksNameWidth, dynamicUnitWidth, task]);

    const handleClick = () => {
        console.log(task.description || "tu bedzie opis");
    };

    return (
        <div ref={taskNameRef} className="task-name">
            {task.taskName}
            <div ref={ganttTaskHolderRef} className="gantt-task-holder">
                <div className="gantt-task-bar" onClick={handleClick}/>
            </div>
        </div>
    )
}

const GanttProcessor = ({ dynamicUnitWidth, dynamicTasksNameWidth, dynamicProcessorWidth, dynamicWidth, processor, tasks }) => {
    const processorRef = useRef(null);
    const processorNumberRef = useRef(null);
    const tasksNameRef = useRef(null);

    useEffect(() => {
        if (processorRef && processorRef.current) {
            const processorsStyle = processorRef.current.style;
            processorsStyle.setProperty('--width-after', dynamicWidth);
            const processorColHeight = processorRef.current.offsetHeight;
            processorsStyle.setProperty('--height-after', `${processorColHeight - 4}px`);
        }
        
        if (processorNumberRef && processorNumberRef.current) {
            const processorNumberStyle = processorNumberRef.current.style;
            processorNumberStyle.setProperty('--processor-width', `${dynamicProcessorWidth - 4}px`)
        }

        if (tasksNameRef && tasksNameRef.current) {
            const tasksNameStyle = tasksNameRef.current.style;
            tasksNameStyle.setProperty('--tasks-width', `${dynamicTasksNameWidth - 4}px`);
        }
    }, [dynamicWidth, dynamicProcessorWidth, dynamicTasksNameWidth])

    return (
        <div ref={processorRef} className="gantt-processor">
            <div ref={processorNumberRef} className="processor-number">
                {processor}
            </div>
            <div ref={tasksNameRef} className="tasks-name">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        dynamicProcessorWidth={dynamicProcessorWidth}
                        dynamicWidth={dynamicWidth}
                        dynamicTasksNameWidth={dynamicTasksNameWidth}
                        dynamicUnitWidth={dynamicUnitWidth}
                    />
                ))}
            </div>
        </div>
    )
}

const GanttGraph = ({ schedule }) => {
    const [legend, setLegend] = useState({});
    const [processors, setProcessors] = useState([]);
    const [dynamicWidth, setDynamicWidth] = useState('100%');
    const [dynamicUnitWidth, setDynamicUnitWidth] = useState(0);
    const [dynamicGraphHeight, setDynamicGraphHeight] = useState(0);
    const [dynamicProcessorWidth, setDynamicProcessorWidth] = useState(0);
    const [dynamicTasksNameWidth, setDynamicTasksNameWidth] = useState(0);

    const legendRef = useRef(null);
    const processorsColRef = useRef(null);

    const handleResize = () => {
        if (legendRef && legendRef.current) {
            const legendWidth = legendRef.current.offsetWidth;
            setDynamicWidth(legendWidth - 1 + 'px');

            const legendProcessor = legendRef.current.querySelector('#legend-processor');
            const legendProcessorWidth = legendProcessor.offsetWidth;
            setDynamicProcessorWidth(legendProcessorWidth);

            const legendTasksName = legendRef.current.querySelector('#legend-tasks-name');
            const legendTasksNameWidth = legendTasksName.offsetWidth;
            setDynamicTasksNameWidth(legendTasksNameWidth);
            
            const unit = legendRef.current.querySelector('.unit');
            const unitWidth = unit.offsetWidth;
            setDynamicUnitWidth(unitWidth);
        }
    }

    useEffect(() => {
        setLegend({
            processorName: 'Processor',
            tasksName: 'Tasks Name',
            timeUnits: schedule.map(({ timeUnit }) => timeUnit)
        });

        const processorTasks = [];

        schedule.forEach(({processorTask, timeUnit}) => {
            processorTask.forEach(({ processor, name, description, id }) => {
                const index = processorTasks.findIndex(lookingIndex => lookingIndex.processor === processor);
                if(index < 0) {
                    const findColor = processorTasks.find(procTask => {
                        const task = procTask.tasks.find(t => t.id === id);
                        return task ? task.color : false
                    })?.tasks.find(task => task.id === id)?.color || null;

                    processorTasks.push({
                        processor: processor,
                        tasks: [{ taskName: name, description, timeUnit: [timeUnit], id, color: findColor || generateRandomColor() }]
                    })
                } else {
                    const findSameTask = processorTasks[index].tasks.find(lookingTask => lookingTask.id === id);
                    if (findSameTask) {
                        findSameTask.timeUnit.push(timeUnit)
                    } else {
                        processorTasks[index].tasks.push({ taskName: name, description, timeUnit: [timeUnit], id, color: generateRandomColor() })
                    }
                }
            })
        });

        setProcessors(processorTasks);
    }, [schedule])

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            handleResize();
        }, 1);

        return () => clearTimeout(timeOutId);
    }, [legendRef]);

    useEffect(() => {
        if (processorsColRef && processorsColRef.current) {
            const processorsColStyle = processorsColRef.current.style;
            processorsColStyle.setProperty('--width-col', `${dynamicProcessorWidth + dynamicTasksNameWidth - 4.5}px`);

            const graphHeight = processorsColRef.current.offsetHeight;
            setDynamicGraphHeight(graphHeight);
        }

        if (legendRef && legendRef.current) {
            const legendUnits = legendRef.current.querySelector('#legend-units');
            
            if (legendUnits) {
                const legendUnitsStyle = legendUnits.style;
                legendUnitsStyle.setProperty('--graph-height', `calc(${dynamicGraphHeight + 4}px + 2rem)`)
            }
        }
    }, [processorsColRef, dynamicProcessorWidth, dynamicTasksNameWidth, dynamicGraphHeight, legendRef]);

    return (
        <div className="graph">
            <div ref={legendRef} className="legend">
                {legend.processorName && <div id="legend-processor" className="legend-processor">{legend.processorName}</div>}
                {legend.tasksName && <div id="legend-tasks-name" className="legend-tasks-name">{legend.tasksName}</div>}
                {legend.timeUnits && <div id="legend-units" className="legend-units">{legend.timeUnits.map((unit) => (
                    <div key={unit} className="unit">{unit}</div>
                ))}</div>}
            </div>
            <div ref={processorsColRef} className="processors">
                {processors.map(({ processor, tasks}) => (
                    <GanttProcessor
                        key={processor}
                        processor={processor}
                        tasks={tasks}
                        dynamicUnitWidth={dynamicUnitWidth}
                        dynamicProcessorWidth={dynamicProcessorWidth}
                        dynamicWidth={dynamicWidth}
                        dynamicTasksNameWidth={dynamicTasksNameWidth}
                    />
                ))}
            </div>
        </div>
    )
};

export default GanttGraph;