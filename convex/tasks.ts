import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTask = mutation({
  args: {
    text: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
      createdAt: Date.now(),
    });
  },
});

export const getTasks = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_created")
      .order("desc")
      .collect();
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleTask = mutation({
  args: {
    id: v.id("tasks"),
  },

  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);

    if (!task) return;

    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
  },
});

export const searchTasks = query({
  args: {
    search: v.string(),
  },

  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .collect();

    return tasks.filter((task) =>
      task.text
        .toLowerCase()
        .includes(args.search.toLowerCase())
    );
  },
});

