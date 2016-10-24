<?php

/**
 * Created by PhpStorm.
 * User: christopher
 * Date: 24/10/16
 * Time: 13:54
 */

namespace Fone\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class UserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}