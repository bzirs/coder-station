import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../layout/index.jsx";
import Issue from "../views/issue/index.jsx";
import Books from "../views/books/index.jsx";
import Interviews from "../views/interviews/index.jsx";

const rootRoute = [
    {
        path: "/",
        element: <Navigate to='/issue'/>,
        meta: {
            name: "home"
        }
    },
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/issue",
                element: <Issue/>,
                meta: {
                    name: "issue"
                }
            },
            {
                path: "/books",
                element: <Books/>,
                meta: {
                    name: "books"
                }
            },
            {
                path: "/interviews",
                element: <Interviews/>,
                meta: {
                    name: "interviews"
                }
            },
        ]
    }
]

const Router = () => useRoutes(rootRoute)


export default Router