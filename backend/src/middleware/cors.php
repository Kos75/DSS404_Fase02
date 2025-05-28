<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {
    $app->add(function (Request $request, Response $response, callable $next) {
        $response = $next($request, $response);

        return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    });

    // CORS preflight (OPTIONS)
    $app->options('/{routes:.+}', function (Request $request, Response $response) {
        return $response;
    });
};
