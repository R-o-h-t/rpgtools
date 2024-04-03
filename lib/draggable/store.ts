'use client'

import { create } from "zustand";
import type { Draggable, DraggableProps } from "./draggable"

interface DraggableState {
  draggables: Record<string, { showDraggable: ShowDraggable, draggableProps: Partial<DraggableProps> }>,
  order: string[],
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
  order: [],
  addDraggable: (
    id: string,
    showDraggable: ShowDraggable,
    draggableProps: Partial<DraggableProps>
  ) => set(
    state => ({
      draggables: {
        ...state.draggables,
        [id]: { showDraggable, draggableProps }
      },
      order: [...state.order, id]
    })),
  removeDraggable: (id: string) => set(
    state => {
      const { [id]: _, ...draggables } = state.draggables
      return {
        draggables,
        order: state.order.filter((orderId) => orderId !== id)
      }
    })
}))

// when a draggable is added to the store, it will be rendered inside the DraggableBoundary component

// expose a method to add a draggable to the store
function addDraggable(
  { id, showDraggable, draggableProps = {} }: {
    id: string,
    showDraggable: ShowDraggable,
    draggableProps?: Partial<DraggableProps>
  }
) {
  useDraggableStore.getState().addDraggable(
    id,
    showDraggable,
    draggableProps
  )
}


function removeDraggable(id: string) {
  useDraggableStore.getState().removeDraggable(id)
}

export { useDraggableStore, addDraggable, removeDraggable }
export type { ShowDraggable }


