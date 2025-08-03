<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/pwi', function () {
    return redirect()->route('dashboard');
})->name('home');

Route::get('/pwi/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
