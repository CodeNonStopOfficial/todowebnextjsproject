"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function HomePage() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const tasks =
    useQuery(api.tasks.searchTasks, {
      search,
    }) || [];

  const createTask = useMutation(api.tasks.createTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const toggleTask = useMutation(api.tasks.toggleTask);

  async function handleAddTask() {
    if (!text.trim()) return;

    await createTask({ text });
    setText("");
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Advanced Todo App CodeNonstop
          </h1>

          <p className="text-slate-300 mt-3 text-sm sm:text-base lg:text-lg">
            Organize your daily tasks beautifully ✨
          </p>
        </div>

        {/* Add Task */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 sm:px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-cyan-400 transition text-sm sm:text-base"
          />

          <button
            onClick={handleAddTask}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            Add Task
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-4 sm:px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-pink-400 transition text-sm sm:text-base"
          />
        </div>

        {/* Task Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-300 text-sm sm:text-base">
            Total Tasks:{" "}
            <span className="font-bold text-white">{tasks.length}</span>
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center text-slate-300 py-10 border border-dashed border-white/20 rounded-2xl text-sm sm:text-base">
              No tasks found 🚀
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/10 border border-white/10 rounded-2xl p-4 sm:p-5 hover:bg-white/15 transition-all duration-200 shadow-md"
              >
                {/* Task Text */}
                <div className="flex items-start sm:items-center gap-3 flex-1">
                  <div
                    className={`min-w-[12px] h-3 rounded-full mt-1 sm:mt-0 ${
                      task.isCompleted ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />

                  <p
                    className={`wrap-break-word text-sm sm:text-base lg:text-lg ${
                      task.isCompleted
                        ? "line-through text-slate-400"
                        : "text-white"
                    }`}
                  >
                    {task.text}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    onClick={() =>
                      toggleTask({
                        id: task._id,
                      })
                    }
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-500/20 hover:bg-green-500 text-white text-lg transition active:scale-95"
                  >
                    ✅
                  </button>

                  <button
                    onClick={() =>
                      deleteTask({
                        id: task._id,
                      })
                    }
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-500/20 hover:bg-red-500 text-white text-lg transition active:scale-95"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-xs sm:text-sm">
          Built with Next.js + Convex 💙
        </div>
      </div>
    </main>
  );
}
