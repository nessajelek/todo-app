import { useState } from 'react';

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
  return (
    <div className="w-full mx-auto relative">
      {/* background */}
      <div className="absolute -z-10 w-full flex items-center justify-center">
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
      </div>
      {/* content */}
      <div className="container w-full mx-auto py-8 px-5 max-w-3xl cursor-default relative">
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-semibold text-3xl text-vlgBlue tracking-[15px]">
            TODO
          </h1>
          <button onClick={() => alert('theme button has been clicked')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
              />
            </svg>
          </button>
        </div>

        {/* input new input todo */}
        <div className="w-full relative mb-6">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 border border-vdgBlue border-opacity-50 w-6 h-6 rounded-full flex items-center justify-center group">
            <input type="checkbox" className="hidden" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="9"
              className="group-hover:inline-block"
            >
              <path
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </div>
          <input
            type="text"
            onKeyDown={(e) => e.key === 'Enter' && console.log(e.target.value)}
            placeholder="create a new todo..."
            className="w-full ps-16 pe-3 h-14 rounded-md bg-white flex items-center text-sm text-DvdBlue font-josefin placeholder:text-sm placeholder:font-normal placeholder:font-josefin placeholder:text-dgBlue"
          />
        </div>

        {/* item list */}
        <div className="w-full bg-white rounded-md shadow-lg mb-4">
          <ul className="w-full py-1">
            {todos.map((td) => (
              <li
                key={td.id}
                className={`w-full flex items-center justify-start border-b group border-dgBlue border-opacity-80 relative pe-2 ps-16 cursor-grab ${
                  td.id === 1 ? 'pt-[2px]' : ''
                } text-sm font-josefin font-normal h-16 ${
                  td.done ? 'line-through text-dgBlue' : 'text-DvdBlue'
                }`}
              >
                <div
                  className={`absolute left-5 top-1/2 -translate-y-1/2 border border-vdgBlue border-opacity-50 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${
                    td.done
                      ? 'bg-gradient-to-br from-[#57ddff] to-[#c058f3]'
                      : ''
                  }`}
                >
                  <input id="check" type="checkbox" className="hidden" />
                  <label htmlFor="check" className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="9"
                      className="group-hover:inline-block"
                    >
                      <path
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2"
                        d="M1 4.304L3.696 7l6-6"
                      />
                    </svg>
                  </label>
                </div>
                <div className="hidden absolute right-3 top-1/2 -translate-y-1/2 group-hover:flex items-center justify-center">
                  <button className="flex items-center justify-center scale-75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                    >
                      <path
                        fill="#494C6B"
                        fillRule="evenodd"
                        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                      />
                    </svg>
                  </button>
                </div>
                {td.name}
              </li>
            ))}
            <li className="w-full flex justify-between items-center h-16 px-6 font-josefin">
              <span className="font-normal text-sm text-dgBlue">
                {todos.filter((todo) => todo.done !== true).length} items left
              </span>
              <div className="hidden md:flex md:justify-center md:items-center md:gap-4">
                <button className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
                  All
                </button>
                <button className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
                  Active
                </button>
                <button className="font-normal text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
                  Completed
                </button>
              </div>
              <button
                className="font-normal text-sm text-dgBlue hover:text-DvdBlue cursor-pointer"
                onClick={() => alert('button clear complete')}
              >
                Clear Complete
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full rounded-lg shadow-lg bg-white flex justify-center items-center gap-4 h-12 mb-4 md:hidden font-josefin">
          <button className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
            All
          </button>
          <button className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
            Active
          </button>
          <button className="font-semibold text-sm text-dgBlue text-center hover:text-DvdBlue cursor-pointer">
            Completed
          </button>
        </div>

        <footer className="w-full flex items-center justify-center h-12 mb-4">
          <span className="font-josefin text-sm text-DvdBlue text-opacity-60">
            Drag and drop do reorder list
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
