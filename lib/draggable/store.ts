'use client'

import { create } from "zustand";
import { DraggableProps } from "./draggable"

interface DraggableState {
  draggables: Record<string, { showDraggable: ShowDraggable, draggableProps: Partial<DraggableProps> }>,
  addDraggable: (
    id: string,
    showDraggable: ShowDraggable,
    draggableProps: Partial<DraggableProps>,
  ) => void
  removeDraggable: (id: string) => void
}

type ShowDraggable = (close: () => void) => React.ReactNode;


const useDraggableStore = create<DraggableState>(set => ({
  draggables: {},
  addDraggable: (
    id: string,
    showDraggable: ShowDraggable,
    draggableProps: Partial<DraggableProps>
  ) => set(
    state => ({
      draggables: {
        ...state.draggables,
        [id]: { showDraggable, draggableProps }
      }
    })),
  removeDraggable: (id: string) => set(
    state => {
      const { [id]: _, ...rest } = state.draggables
      return { draggables: rest }
    })
}))

// when a draggable is added to the store, it will be rendered inside the DraggableBoundary component

// expose a method to add a draggable to the store
function addDraggable(
  id: string,
  showDraggable: ShowDraggable,
  draggableProps: Partial<DraggableProps>
) {
  useDraggableStore.getState().addDraggable(
    id,
    showDraggable,
    draggableProps
  )
}


export { useDraggableStore, addDraggable }
export type { ShowDraggable }
