<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/pwi', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::get('/pwi/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

// Serve /pwi/build/ requests directly from /build/ for assets
Route::get('/pwi/build/{path}', function ($path) {
    return response()->file(public_path("build/$path"));
})->where('path', '.*');

Route::middleware(['auth', 'verified'])->group(function () {});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
