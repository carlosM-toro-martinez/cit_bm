<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function index()
    {
        $visitors = Visitor::all();
        return response()->json($visitors);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'mail' => 'required|email',
        ]);

        $visitor = new Visitor();
        $visitor->name = $request->name;
        $visitor->mail = $request->mail;
        $visitor->save();

        return response()->json($visitor, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'mail' => 'required|email',
        ]);

        $visitor = Visitor::findOrFail($id);
        $visitor->name = $request->name;
        $visitor->mail = $request->mail;
        $visitor->save();

        return response()->json($visitor, 200);
    }

    public function destroy($id)
    {
        $visitor = Visitor::findOrFail($id);
        $visitor->delete();

        return response()->json(null, 204);
    }
}

