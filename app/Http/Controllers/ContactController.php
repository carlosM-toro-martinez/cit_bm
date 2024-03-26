<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'coordinates' => 'required|array',
            'ubication' => 'required|string',
            'mail' => 'required|email',
            'phone_number' => 'required|string',
            'facebook' => 'nullable|string',
            'instagram' => 'nullable|string',
            'tiktok' => 'nullable|string',
            'x' => 'nullable|string',
        ]);

        $coordinatesJson = json_encode($request->coordinates);

        $contact = new Contact();
        $contact->coordinates = $coordinatesJson;
        $contact->ubication = $request->ubication;
        $contact->mail = $request->mail;
        $contact->phone_number = $request->phone_number;
        $contact->facebook = $request->facebook;
        $contact->instagram = $request->instagram;
        $contact->tiktok = $request->tiktok;
        $contact->x = $request->x;

        $contact->save();

        return response()->json($contact, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'coordinates' => 'required|array',
            'ubication' => 'required|string',
            'mail' => 'required|email',
            'phone_number' => 'required|string',
            'facebook' => 'nullable|string',
            'instagram' => 'nullable|string',
            'tiktok' => 'nullable|string',
            'x' => 'nullable|string',
        ]);

        $coordinatesJson = json_encode($request->coordinates);

        $contact = Contact::findOrFail($id);
        $contact->coordinates = $coordinatesJson;
        $contact->ubication = $request->ubication;
        $contact->mail = $request->mail;
        $contact->phone_number = $request->phone_number;
        $contact->facebook = $request->facebook;
        $contact->instagram = $request->instagram;
        $contact->tiktok = $request->tiktok;
        $contact->x = $request->x;
        $contact->save();

        return response()->json($contact, 200);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(null, 204);
    }
}

