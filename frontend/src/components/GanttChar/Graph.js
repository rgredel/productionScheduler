import React, { useEffect, useRef, useState } from "react";
import { generateRandomColor } from "./generateRandomColor";

const Task = ({ processorTask, dynamicUnitWidth }) => {
    const taskRef = useRef(null);

    useEffect(() => {
        if(taskRef && taskRef.current) {
            const taskStyle = taskRef.current.style;
            taskStyle.setProperty('--dynamic-unit-width', `calc(${dynamicUnitWidth * processorTask.timeUnit.length}px - 2rem)`);
            taskStyle.setProperty('--task-color', processorTask.color);
            taskStyle.setProperty('--task-margin', `calc(${dynamicUnitWidth * processorTask.timeUnit[0]}px + 1rem)`);
        }
    }, [dynamicUnitWidth, processorTask]);

    const handleClick = () => {
        console.log(processorTask.description || "tu bedzie opis");
    };

    return (
        <div ref={taskRef} className="processor-task" onClick={handleClick}>{processorTask.taskName}</div>
    )
}
  

const Processor = ({ dynamicUnitWidth, dynamicProcessorWidth, dynamicWidth, proc, task }) => {
    const processorRef = useRef(null);
    const processorTaskRef = useRef(null);

    useEffect(() => {
        if (processorRef && processorRef.current) {
            const processorsStyle = processorRef.current.style;
            processorsStyle.setProperty('--width-after', dynamicWidth);
            
            if(processorTaskRef && processorTaskRef.current) {
                const processorTaskStyle = processorTaskRef.current.style;
                processorTaskStyle.setProperty('--dynamic-width', `calc(${dynamicWidth} - ${dynamicProcessorWidth}px)`);
                processorTaskStyle.setProperty('--dynamic-processor-width', `${dynamicProcessorWidth}px`);
            }
        }
    }, [dynamicWidth, dynamicProcessorWidth])

    return (
        <div ref={processorRef} className="processor">
            {proc}
            <div ref={processorTaskRef} className="processor-tasks">
                {task.map(processorTask => (
                    <Task
                        key={processorTask.id}
                        processorTask={processorTask}
                        dynamicUnitWidth={dynamicUnitWidth}    
                    />
                ))}
            </div>
        </div>
    )
}

const Graph = ({ schedule }) => {
    const [legend, setLegend] = useState({});
    const [processors, setProcessors] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [dynamicWidth, setDynamicWidth] = useState('100%');
    const [dynamicUnitWidth, setDynamicUnitWidth] = useState(0);
    const [dynamicGraphHeight, setDynamicGraphHeight] = useState(0);
    const [dynamicProcessorWidth, setDynamicProcessorWidth] = useState(0);

    const legendRef = useRef(null);
    const processorsColRef = useRef(null);

    const handleResize = () => {
        if (legendRef && legendRef.current) {
            const legendWidth = legendRef.current.offsetWidth;
            setDynamicWidth(legendWidth - 1 + 'px');

            const legendProcessor = legendRef.current.querySelector('.legend-processor');
            const legendProcessorWidth = legendProcessor.offsetWidth;
            setDynamicProcessorWidth(legendProcessorWidth);
            
            const unit = legendRef.current.querySelector('.unit');
            const unitWidth = unit.offsetWidth;
            setDynamicUnitWidth(unitWidth);
        }
    }

    useEffect(() => {
        setLegend({
            processorName: 'Processor',
            timeUnits: schedule.map(({ timeUnit }) => timeUnit)
        });
        
        const allProcessors = schedule
            .flatMap((item) => item.processorTask)
            .map(({ processor }) => processor);
        setProcessors([...new Set(allProcessors)]);

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

        setTasks(processorTasks);

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
    }, [legendRef])

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (processorsColRef && processorsColRef.current) {
                const graphHeight = processorsColRef.current.offsetHeight;
                setDynamicGraphHeight(graphHeight);
            }

            if (legendRef && legendRef.current) {
                const legendStyle = legendRef.current.style;
                legendStyle.setProperty('--graph-height', `calc(${dynamicGraphHeight + 4}px + 2rem)`);
            }
        }, 1)

        return () => clearTimeout(timeOutId); 
    }, [processorsColRef, legendRef, dynamicGraphHeight]);

    return (
        <div className="graph">
            <div ref={legendRef} className="legend">
                {legend.processorName && <div className="legend-processor">{legend.processorName}</div>}
                {legend.timeUnits && <div id="legend-units" className="legend-units">{legend.timeUnits.map((unit) => (
                    <div key={unit} className="unit">{unit}</div>
                ))}</div>}
            </div>
            <div ref={processorsColRef} className="processors">
                {processors.map((proc) => (
                    <Processor
                        key={proc}
                        proc={proc}
                        task={tasks.find(t => t.processor === proc)?.tasks || []}
                        dynamicUnitWidth={dynamicUnitWidth}
                        dynamicProcessorWidth={dynamicProcessorWidth}
                        dynamicWidth={dynamicWidth}
                    />
                ))}
            </div>
        </div>
    )
};

export default Graph;