<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::with('visitor')->get();
        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'case' => 'required|string',
            'message' => 'required|string',
            'id_visitor' => 'required|integer|exists:visitors,id_visitor',
        ]);

        $message = new Message();
        $message->case = $request->case;
        $message->message = $request->message;
        $message->id_visitor = $request->id_visitor;
        $message->save();

        return response()->json($message, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'case' => 'required|string',
            'message' => 'required|string',
            'id_visitor' => 'required|integer|exists:visitors,id_visitor',
        ]);

        $message = Message::findOrFail($id);
        $message->case = $request->case;
        $message->message = $request->message;
        $message->id_visitor = $request->id_visitor;
        $message->save();

        return response()->json($message, 200);
    }

    public function destroy($id)
    {
        $message = Message::findOrFail($id);
        $message->delete();

        return response()->json(null, 204);
    }
}
