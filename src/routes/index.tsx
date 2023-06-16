import Members from "@/pages/Members"
import NotFound from "@/pages/NotFound"
import TeamDetails from "@/pages/TeamDetails"
import Teams from "@/pages/Teams"
import Todo from "@/pages/Todo"
import { useRoutes } from "react-router-dom"

const Routes = () => {

  const routes = useRoutes([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Todo />,
        },
        { path: "teams", element: <Teams /> },
        { path: "members", element: <Members /> },
        { path: "todo", element: <Todo /> },
        { path: "members/:name", element: <TeamDetails /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])

  return (
    <>
      {routes}
    </>
  )
}

export default Routes
