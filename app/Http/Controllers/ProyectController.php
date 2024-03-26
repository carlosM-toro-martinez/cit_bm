<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProyectController extends Controller
{
    public function index()
    {
        $proyect = Project::all();
        return response()->json($proyect);
    }

    public function indexByCategory($id_category)
    {
        if (!Category::where('id_category', $id_category)->exists()) {
            return response()->json(['error' => 'La categoría especificada no existe.'], 404);
        }
        $proyects = Project::where('id_category', $id_category)->get();

        return response()->json($proyects);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string',
            'id_category' => 'required',
        ]);

        $proyect = new Project();
        $proyect->image = $request->image_name;
        $proyect->title = $request->title;
        $proyect->id_category = $request->id_category;
        $proyect->save();

        return response()->json($proyect, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string',
            'id_category' => 'required|integer|exists:categories,id_category',
        ]);

        $proyect = Project::findOrFail($id);
        $proyect->image = $request->image_name;
        $proyect->title = $request->title;
        $proyect->id_category = $request->id_category;
        $proyect->save();

        return response()->json($proyect, 200);
    }

    public function destroy($id)
    {
        $proyect = Project::findOrFail($id);
        $proyect->delete();

        return response()->json(null, 204);
    }
}
