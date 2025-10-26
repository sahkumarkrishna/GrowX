
import { DragDropContext, Droppable } from "react-beautiful-dnd";


import Column from "./Column";

const statuses = ["todo", "in-progress", "done"];

export default function Board() {
  
  const onDragEnd = (result) => {
    const { destination, source,} = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    
    
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-gradient-to-r from-indigo-50 to-pink-50">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1"
              >
                <Column
                  status={status}
                  
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
