import App from './App';
import Home from './Home';
import NewLog from './NewLog';
import Workouts from './Workouts';
import Logs from './Logs';

const routes = [
    {
        path: '/',
        element: <App />,
        // errorElement: <ErrorPages />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            // {
            //     path: '/login',  //  /champions/:id/edit    '/update_form/:id'
            //     element: <Login />,
            // },
            {
                path: '/newlog',
                element: <NewLog />
            },
            {
               path: '/logs/:user_id/:workout_id',
               element: <Logs />
            },
            {
                path: '/workouts', //  /champions/new   '/new_form'
                element: <Workouts />
            },
        ]
    }
]

export default routes;

