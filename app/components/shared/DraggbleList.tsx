import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
// import { CSS } from '@dnd-kit/utilities';
import React, { useState } from "react";

interface DraggableListProps {
  items: string[];
  onDragEnd: (items: string[]) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ items, onDragEnd }) => {
  const [currentItems, setCurrentItems] = useState(items);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = currentItems.indexOf(active.id);
    const newIndex = currentItems.indexOf(over.id);
    const newItems = arrayMove(currentItems, oldIndex, newIndex);

    setCurrentItems(newItems);
    onDragEnd(newItems);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={currentItems} strategy={rectSortingStrategy}>
        {currentItems.map((item) => (
          <div key={item} className="p-2 my-1 bg-gray-200 rounded shadow">
            {item}
          </div>
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DraggableList;
