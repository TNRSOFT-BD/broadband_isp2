<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the public homepage.
     */
    public function index(): Response
    {
        return Inertia::render('welcome');
    }
}
