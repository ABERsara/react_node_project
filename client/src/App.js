import Layout from './common/Layout';
import PostsList from './posts/PostsList'
import PhotosList from './photos/PhotosList'
import TodosList from './todos/TodosList'
import UsersList from './users/UsersList';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home Page</h1>}/>
            <Route path='/users' element={<UsersList />}/>
            <Route path='/posts' element={<PostsList />}/>
            <Route path='/todos' element={<TodosList />}/>
            <Route path='/photos' element={<PhotosList />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
