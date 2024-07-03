import {Navigate, useRoutes} from "react-router-dom";
import Layout from "../layout/index.jsx";
import Issue from "../views/issue/index.jsx";
import Books from "../views/books/index.jsx";
import Interviews from "../views/interviews/index.jsx";
import AddIssue from "../views/issue/pages/add/index.jsx";
import IssueDetail from "../views/issue/pages/detail/index.jsx";
import Search from "../views/search/index.jsx";

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
                path: "/issue/add",
                element: <AddIssue/>
            },
            {
                path: "/issue/:id",
                // element: import('../views/issue/pages/detail/index.jsx')
                element: <IssueDetail/>

            },
            {
                path: "/search-result",
                element: <Search/>,
                meta: {
                    name: "searchResult"
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
    },

]

const Router = () => useRoutes(rootRoute)


export default Router