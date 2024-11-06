import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router, Head } from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput";

export default function Index({auth, success, tasks, queryParams = null}) {
	queryParams = queryParams || {};
	const searchFieldChanged = (name, value) => {
		if (value) {
			queryParams[name] = value;
		} else {
			delete queryParams[name];
		}

		router.get(route("task.index"), queryParams);
	};

	const deleteTask = (task) => {
		if (!window.confirm("Are you sure you want to delete the task?")) {
			return;
		}
		router.delete(route("task.destroy", task.id));
	};
	return (
		<AuthenticatedLayout
			user={auth.user}
			header={
				<div className="flex items-center justify-between">
					<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
						Tasks
					</h2>
					<Link
						href={route("task.create")}
						className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
					>
						Add new
					</Link>
				</div>
			}
		>
			<Head title="Tasks" />


			{success && (
				<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
					{success}
				</div>
			)}

			<div className="py-12">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
						<div className="p-6 text-gray-900 dark:text-gray-100">
							{/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}


			<div className="overflow-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
						<tr className="text-nowrap">
							<th className="px-3 py-3 text-left">ID</th>
							<th className="px-3 py-3 text-left">Title</th>
							<th className="px-3 py-3 text-left">Description</th>
							<th className="px-3 py-3 text-left">Status</th>
							<th className="px-3 py-3 text-left">Due Date</th>
							<th className="px-3 py-3 text-left">User ID</th>
							<th className="px-3 py-3 text-left">Actions</th>
						</tr>
					</thead>
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
						<tr className="text-nowrap">
							<th className="px-3 py-3"></th>
							<th className="px-3 py-3"></th>
							<th className="px-3 py-3"></th>
							<th className="px-3 py-3">
								<SelectInput
									className="w-full"
									defaultValue={queryParams.status}
									onChange={(e) => searchFieldChanged("status", e.target.value)}
								>
									<option value="">Select Status</option>
									<option value="pending">Pending</option>
									<option value="completed">Completed</option>
								</SelectInput>
							</th>
							<th className="px-3 py-3"></th>
							<th className="px-3 py-3"></th>
							<th className="px-3 py-3"></th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<tr
								className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
								key={task.id}
							>
								<td className="px-3 py-2">{task.id}</td>
								<td className="px-3 py-2">{task.title}</td>
								<td className="px-3 py-2">{task.description}</td>
								<td className="px-3 py-2">{task.status}</td>
								<td className="px-3 py-2">{task.due_date}</td>
								<td className="px-3 py-2">{task.user_id}</td>
								<td className="px-3 py-2 text-nowrap">
									<Link
										href={route("task.edit", task.id)}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
									>
										Edit
									</Link>
									<button
										onClick={(e) => deleteTask(task)}
										className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

						</div>
					</div>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
