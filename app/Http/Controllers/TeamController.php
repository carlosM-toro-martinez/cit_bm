<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        $teams = Team::all();

        return response()->json($teams);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string',
            'last_name' => 'required|string',
            'mail' => 'required|email',
            'position' => 'required|string',
        ]);

        $team = new Team();
        $team->image = $request->image_name;
        $team->name = $request->name;
        $team->last_name = $request->last_name;
        $team->mail = $request->mail;
        $team->position = $request->position;
        $team->save();

        return response()->json($team, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => 'required|string',
            'last_name' => 'required|string',
            'mail' => 'required|email',
            'position' => 'required|string',
        ]);

        $team = Team::findOrFail($id);
        if ($request->image_name) {
            $team->image = $request->image_name;
        }
        $team->name = $request->name;
        $team->last_name = $request->last_name;
        $team->mail = $request->mail;
        $team->position = $request->position;
        $team->save();

        return response()->json($team, 200);
    }

    public function destroy($id)
    {
        $team = Team::findOrFail($id);
        $team->delete();

        return response()->json(null, 204);
    }
}
