"use client";

import { createContext, useContext, useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormFields } from "@/app/types/form";

interface DragDropContextProps {
  forms: FormFields[];
  setForms: React.Dispatch<React.SetStateAction<FormFields[]>>;
  handleDragEnd: (event: DragEndEvent) => void;
}

const DragDropContext = createContext<DragDropContextProps | undefined>(
  undefined
);

export const useDragDropContext = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDropContext must be used within DragDropProvider");
  }
  return context;
};

export const DragDropProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [forms, setForms] = useState<FormFields[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setForms((prev) => {
        const oldIndex = prev.findIndex((item) => item.formId === active.id);
        const newIndex = prev.findIndex((item) => item.formId === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <DragDropContext.Provider value={{ forms, setForms, handleDragEnd }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={forms.map((form) => form.formId)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DndContext>
    </DragDropContext.Provider>
  );
};
