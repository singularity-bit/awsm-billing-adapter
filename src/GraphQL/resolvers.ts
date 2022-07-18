import { pages,settings } from "../data/data"
export const resolvers={
    Query:{
        navigation(){
            return pages
        },
        profileSettings(){
            return settings
        }
    }
}