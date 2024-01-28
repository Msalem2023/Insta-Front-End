import { createContext, useReducer } from "react"
const INTIAL_STATE = {

    User: []

}

const Userreducer = (state, action) => {
    if (action.type === "add") {
        console.log(action.payload)
        const img = [action.payload]
        return [state, ...img]

    }
}



export const UserContext = createContext()
export const QueryContextProviver = ({ children }) => {
    const [state, dispatch] = useReducer(Userreducer, INTIAL_STATE)
    console.log(state)


    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    )
}


