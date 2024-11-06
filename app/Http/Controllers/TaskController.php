<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::with(['user:id,name']);
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $tasks = $query->get();
        // dd($tasks->toArray());

        return inertia("Task/Index", [
            "tasks" => $tasks,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::orderBy('name', 'asc')->get();

        return inertia("Task/Create", [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate( [
            "title" => ['required', 'max:255'],
            "description" => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'user_id' => ['required', 'exists:users,id'],
            'status' => [
                'required',
                Rule::in(['pending', 'completed'])
            ],
        ]);

        $data = $request->all();
        Task::create($data);

        return to_route('task.index')->with('success', 'Task was created');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::orderBy('name', 'asc')->get();

        return inertia("Task/Edit", [
            'task' => $task,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $request->validate( [
            "title" => ['required', 'max:255'],
            "description" => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'user_id' => ['required', 'exists:users,id'],
            'status' => [
                'required',
                Rule::in(['pending', 'completed'])
            ],
        ]);

        $data = $request->all();
        $task->update($data);

        return to_route('task.index')->with('success', "Task \"$task->title\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $title = $task->title;
        $task->delete();
        return to_route('task.index')->with('success', "Task \"$title\" was deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::where('user_id', $user->id);
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $tasks = $query->get();
        // $tasks = $query
        //     ->paginate(10)
        //     ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => $tasks,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
