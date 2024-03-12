import Layout from './common/Layout';
import PostsList from './posts/PostsList'
import PhotosList from './photos/PhotosList'
import TodosList from './todos/TodosList'
import UsersList from './users/UsersList';
import UpdateUser from './users/UpdateUser';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import UpdatePhoto from './photos/UpdatePhoto';
import UpdateTodo from './todos/UpdateTodo';
import UpdatePost from './posts/UpdatePost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/users' element={<UsersList />}>
              <Route path=":id" element={<UpdateUser />} />
            </Route>
            <Route path='/posts' element={<PostsList />} >
            <Route path=":id" element={<UpdatePost />} />
            </Route>
            <Route path='/todos' element={<TodosList />} >
{/* יוביל אליוoutletברגע שהאלמנט הוא בן של אביו הניווט - ו  */}
            <Route path=":id" element={<UpdateTodo />} />
            </Route>
            <Route path='/photos' element={<PhotosList />} >
            <Route path=":id" element={<UpdatePhoto />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
