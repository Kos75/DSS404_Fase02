<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;

$app = AppFactory::create();
$app->addErrorMiddleware(true, true, true);
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();

$errorMiddleware = $app->addErrorMiddleware(true, true, true);

(require __DIR__ . '/../src/middleware/cors.php')($app);

require __DIR__ . '/../src/routes/auth.php';
require __DIR__ . '/../src/routes/atm.php';
require __DIR__ . '/../src/routes/transfer.php';
require __DIR__ . '/../src/routes/clients.php';
require __DIR__ . '/../src/routes/audit.php';
require __DIR__ . '/../src/routes/products.php';

$app->run();
