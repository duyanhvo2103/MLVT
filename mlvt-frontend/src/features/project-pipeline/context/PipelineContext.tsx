import { createContext } from "react";
import { PipelineState, PipelineAction } from "../types";
import { initialState } from "../reducer/pipelineReducer"; 

// 1. Define the type for the context's value.
// This is a "contract" that says our context will provide an object
// containing the current state and a dispatch function to update it.
export interface PipelineContextType {
    state: PipelineState;
    dispatch: React.Dispatch<PipelineAction>;
}

// 2. Create the Context object with a default value.
// The default value is only used if a component tries to consume the context
// without a matching <PipelineContext.Provider> above it in the component tree.
// Providing a default that throws an error is a good practice for debugging.
export const PipelineContext = createContext<PipelineContextType>({
    state: initialState,
    dispatch: () => {
        throw new Error(
            "dispatch function was called outside of the PipelineProvider"
        );
    },
});
