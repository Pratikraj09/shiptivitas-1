import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];
  const [removed] = sourceItems.splice(source.index, 1);
  destItems.splice(destination.index, 0, removed);
  setColumns({
    ...columns,
    [source.droppableId]: {
      ...sourceColumn,
      items: sourceItems,
    },
    [destination.droppableId]: {
      ...destColumn,
      items: destItems,
    },
  });
};

<DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
  {/* Map through the swimlanes */}
  {Object.entries(columns).map(([columnId, column], index) => (
    <Droppable key={columnId} droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {/* Map through the cards */}
          {column.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    backgroundColor: snapshot.isDragging ? "lightblue" : item.color,
                    ...provided.draggableProps.style
                  }}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ))}
</DragDropContext>

<div className="kanban-board">
  <div className="swimlane backlog">
    <h3>Backlog</h3>
    <div className="cards-container" id="backlog-lane">
      {/* Cards in Backlog */}
    </div>
  </div>
  <div className="swimlane in-progress">
    <h3>In-Progress</h3>
    <div className="cards-container" id="in-progress-lane">
      {/* Cards in In-Progress */}
    </div>
  </div>
  <div className="swimlane complete">
    <h3>Complete</h3>
    <div className="cards-container" id="complete-lane">
      {/* Cards in Complete */}
    </div>
  </div>
</div>


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];

  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  const [removed] = sourceItems.splice(source.index, 1);
  
  // Change color based on destination column
  removed.color = destination.droppableId === "backlog" ? "gray" : 
                  destination.droppableId === "in-progress" ? "yellow" : 
                  "green";

  destItems.splice(destination.index, 0, removed);

  setColumns({
    ...columns,
    [source.droppableId]: {
      ...sourceColumn,
      items: sourceItems,
    },
    [destination.droppableId]: {
      ...destColumn,
      items: destItems,
    },
  });
};
