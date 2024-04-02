<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProyectController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VisitorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('/courses', [CourseController::class, 'index']);

Route::get('/questions', [QuestionController::class, 'index']);

Route::get('/team', [TeamController::class, 'index']);

Route::get('/contacts', [ContactController::class, 'index']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/allprojects', [ProyectController::class, 'index']);
Route::get('/projects/{id_category}', [ProyectController::class, 'indexByCategory']);

Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store'])
    ->middleware(\App\Http\Middleware\LogVisitorMiddleware::class);


Route::get('/visitors', [VisitorController::class, 'index']);

Route::group(['middleware' => 'auth:sanctum'], function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/users', [UserController::class, 'index']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);


    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/courses', [CourseController::class, 'store'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::post('/courses/{id}', [CourseController::class, 'update'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    Route::post('/questions', [QuestionController::class, 'store']);
    Route::post('/questions/{id}', [QuestionController::class, 'update']);
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);

    Route::post('/team', [TeamController::class, 'store'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::post('/team/{id}', [TeamController::class, 'update'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::delete('/team/{id}', [TeamController::class, 'destroy']);

    Route::post('/contacts', [ContactController::class, 'store']);
    Route::post('/contacts/{id}', [ContactController::class, 'update']);
    Route::delete('/contacts/{id}', [ContactController::class, 'destroy']);

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::post('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/projects', [ProyectController::class, 'store'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::post('/projects/{id}', [ProyectController::class, 'update'])
        ->middleware(\App\Http\Middleware\ImageUploadMiddleware::class);
    Route::delete('/projects/{id}', [ProyectController::class, 'destroy']);

    Route::post('/messages/{id}', [MessageController::class, 'update']);
    Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

    Route::post('/visitors', [VisitorController::class, 'store']);
    Route::post('/visitors/{id}', [VisitorController::class, 'update']);
    Route::delete('/visitors/{id}', [VisitorController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Route::get('/images/{filename}', function ($filename) {
//     $path = storage_path('app/public/images/' . $filename);

//     if (!file_exists($path)) {
//         abort(404);
//     }

//     return response()->file($path);
// })->where('filename', '.*');
