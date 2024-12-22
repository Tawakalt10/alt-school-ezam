import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";
import NotFound from "./pages/NotFound";
import ErrorTest from "./pages/ErrorTest";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/todos/:id" element={<TodoDetail />} />
            <Route path="/error-test" element={<ErrorTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
