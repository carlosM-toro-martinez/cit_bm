<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class LogVisitorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'mail' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            Log::debug('error');
            return response()->json(['error' => $validator->errors()], 400);
        }

        $visitor = Visitor::create([
            'name' => $request->input('name'),
            'mail' => $request->input('mail'),
        ]);

        $request->merge(['id_visitor' => $visitor->id_visitor]);

        return $next($request);
    }
}
