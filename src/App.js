import { useEffect, useState } from 'react';

const todos = [
  { id: 1, name: 'Finish setting up the to-do app', done: false },
  { id: 2, name: 'Write unit tests for the components', done: false },
  { id: 3, name: 'Review the React documentation', done: true },
  { id: 4, name: 'Add drag-and-drop functionality', done: false },
  { id: 5, name: 'Fix the responsiveness issues', done: true },
  { id: 6, name: 'Plan features for the next version', done: false },
  { id: 7, name: "Optimize the app's performance", done: false },
  { id: 8, name: 'Write blog post about the to-do app', done: false },
  { id: 9, name: 'Implement dark mode toggle', done: true },
  { id: 10, name: 'Refactor the code for better readability', done: false },
];

function App() {
  const [listTodo, setListTodo] = useState(todos);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-DvdBlue');

    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function handleThemeSwitch() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function addTodo(newTodo) {
    setListTodo((todos) => [...todos, newTodo]);
  }

  function removeTodo(id) {
    setListTodo((todos) => todos.filter((todo) => todo.id !== id));
  }

  function clearDone() {
    setListTodo((todos) => todos.filter((todo) => !todo.done && todo));
  }

  function setDone(id) {
    setListTodo((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  const done = listTodo.filter((todo) => todo.done && todo);
  const underdone = listTodo.filter((todo) => !todo.done && todo);
  const filteredListTodo = listTodo.toSorted((a, b) => a.done - b.done);

  return (
    <div className="w-full mx-auto relative">
      {/* background */}
      <div className="absolute z-10 w-full flex items-center justify-center">
        {theme === 'dark' ? (
          <>
            <img
              src="images/bg-mobile-dark.jpg"
              alt="bg-light-mobile"
              className="w-full max-h-[200px] sm:hidden"
            />
            <img
              src="images/bg-desktop-dark.jpg"
              alt="bg-desktop-light"
              className="w-full max-h-[300px] hidden sm:block"
            />
          </>
        ) : (
          <>
            <img
              src="images/bg-mobile-light.jpg"
              alt="bg-light-mobile"
              className="w-full max-h-[200px] sm:hidden"
            />
            <img
              src="images/bg-desktop-light.jpg"
              alt="bg-desktop-light"
              className="w-full max-h-[300px] hidden sm:block"
            />
          </>
        )}
      </div>

      {/* content */}
      <div className="container w-full mx-auto pt-8 px-5 max-w-3xl cursor-default relative z-20">
        <Header onSwitchTheme={handleThemeSwitch} theme={theme} />
        <InputToDo theme={theme} onAddTodo={addTodo} listTodo={listTodo} />
        <ListToDo
          todos={
            filter === 'all'
              ? filteredListTodo
              : filter === 'done'
              ? done
              : underdone
          }
          onSetDone={setDone}
          onSetFilter={setFilter}
          onClearDone={clearDone}
          onRemoveTodo={removeTodo}
          theme={theme}
        />
        <FilterTodo onSetFilter={setFilter} />
        <Footer />
      </div>
    </div>
  );
}

function Header({ onSwitchTheme, theme }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-semibold text-3xl text-vlgBlue tracking-[15px]">
        TODO
      </h1>
      <button onClick={() => onSwitchTheme()}>
        {theme === 'light' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#FFF"
              fillRule="evenodd"
              d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path
              fill="#FFF"
              fillRule="evenodd"
              d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

function InputToDo({ onAddTodo, listTodo, theme }) {
  const [input, setInputTodo] = useState('');

  function handleAddTodo() {
    if (input === '') {
      return;
    }

    const newTodo = {
      id: listTodo.length + 1,
      name: input,
      done: false,
    };
    onAddTodo(newTodo);
    setInputTodo('');
  }

  return (
    <div className="w-full relative mb-6">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 border border-vdgBlue dark:border-DlgBlueH dark:border-opacity-50 border-opacity-50 w-6 h-6 rounded-full flex items-center justify-center group">
        <input type="checkbox" className="hidden" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="9"
          className="group-hover:inline-block"
        >
          <path
            fill="none"
            stroke={theme === 'dark' ? '#25273c' : '#fff'}
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInputTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
        placeholder="create a new todo..."
        className="w-full ps-16 pe-3 h-14 rounded-md bg-white dark:bg-DvddBlue dark:text-DlgBlueH flex items-center text-sm text-DvdBlue font-josefin placeholder:text-sm placeholder:font-normal placeholder:font-josefin placeholder:text-dgBlue"
      />
    </div>
  );
}

function ListToDo({
  todos,
  onSetDone,
  onSetFilter,
  onClearDone,
  onRemoveTodo,
  theme
}) {
  return (
    <div className="w-full bg-white dark:bg-DvddBlue rounded-md shadow-lg mb-4">
      <ul className="w-full py-1">
        {todos.map((td, index) => (
          <TodoItem
            key={index}
            todoObj={td}
            onSetDone={onSetDone}
            onRemoveTodo={onRemoveTodo}
            theme={theme}
          />
        ))}

        {/* todo stats + clear & filter at lg */}
        <li className="w-full flex justify-between items-center h-16 px-6 font-josefin">
          <span className="font-normal text-sm text-dgBlue dark:text-DlgBlueH">
            {todos.filter((todo) => todo.done !== true).length} items left
          </span>
          <div className="hidden md:flex md:justify-center md:items-center md:gap-4">
            <button
              className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue dark:text-DlgBlueH dark:hover:text-dgBlue cursor-pointer"
              onClick={() => onSetFilter('all')}
            >
              All
            </button>
            <button
              className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue dark:text-DlgBlueH dark:hover:text-dgBlue cursor-pointer"
              onClick={() => onSetFilter('underdone')}
            >
              Active
            </button>
            <button
              className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue dark:text-DlgBlueH dark:hover:text-dgBlue cursor-pointer"
              onClick={() => onSetFilter('done')}
            >
              Completed
            </button>
          </div>
          <button
            className="font-normal text-sm text-dgBlue hover:text-DvdBlue cursor-pointer dark:text-DlgBlueH dark:hover:text-dgBlue"
            onClick={onClearDone}
          >
            Clear Complete
          </button>
        </li>
      </ul>
    </div>
  );
}

function TodoItem({ todoObj, onSetDone, onRemoveTodo, theme }) {
  return (
    <li
      className={`w-full flex items-center justify-start border-b group border-dgBlue border-opacity-80 relative pe-2 ps-16 cursor-grab ${
        todoObj.id === 1 ? 'pt-[2px]' : ''
      } text-sm font-josefin font-normal h-16 ${
        todoObj.done ? 'line-through text-dgBlue dark:text-DdgBlue' : 'text-DvdBlue dark:text-DlgBlueH'
      }`}
    >
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 border border-vdgBlue dark:border-DlgBlueH dark:border-opacity-50 border-opacity-50 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
          todoObj.done ? 'bg-gradient-to-br from-[#57ddff] to-[#c058f3]' : ''
        }`}
      >
        <input
          id={todoObj.id}
          type="checkbox"
          className="hidden"
          checked={todoObj.done}
          onChange={() => onSetDone(todoObj.id)}
        />
        <label htmlFor={todoObj.id} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            className="group-hover:inline-block"
          >
            <path
              fill="none"
              stroke={theme === 'dark' && todoObj.done ? '#fff' : theme === 'light' ? '#fff' : '#25273c'}
              strokeWidth="2"
              d="M1 4.304L3.696 7l6-6"
            />
          </svg>
        </label>
      </div>
      <div className="hidden absolute right-3 top-1/2 -translate-y-1/2 group-hover:flex items-center justify-center">
        <button
          className="flex items-center justify-center scale-75"
          onClick={() => onRemoveTodo(todoObj.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path
              // fill="#494C6B" #e4e5f1
              fill={theme === 'dark' ? '#e4e5f1' : '#494C6B'}
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
            />
          </svg>
        </button>
      </div>
      {todoObj.name}
    </li>
  );
}

function FilterTodo({ onSetFilter }) {
  return (
    <div className="w-full rounded-lg shadow-lg bg-white dark:bg-DvddBlue flex justify-center items-center gap-4 h-12 mb-4 md:hidden font-josefin">
      <button
        className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer dark:text-DlgBlueH dark:hover:text-dgBlue"
        onClick={() => onSetFilter('all')}
      >
        All
      </button>
      <button
        className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer dark:text-DlgBlueH dark:hover:text-dgBlue"
        onClick={() => onSetFilter('underdone')}
      >
        Active
      </button>
      <button
        className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer dark:text-DlgBlueH dark:hover:text-dgBlue"
        onClick={() => onSetFilter('done')}
      >
        Completed
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full flex items-center justify-center h-12 mb-12">
      <span className="font-josefin text-sm text-DvdBlue text-opacity-60">
        Drag and drop do reorder list
      </span>
    </footer>
  );
}

export default App;
